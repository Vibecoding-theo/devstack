'use client';

import { Component, ComponentLanguage } from './types';

export interface ParsedFile {
  name: string;
  code: string;
  language: ComponentLanguage;
  dependencies: string[];
  description: string;
}

// Détection des imports et dépendances par langage
const IMPORT_PATTERNS: Record<string, RegExp[]> = {
  javascript: [
    /import\s+(?:{[^}]*}|\w+|\*\s+as\s+\w+)(?:\s*,\s*(?:{[^}]*}|\w+|\*\s+as\s+\w+))*\s+from\s+['"]([^'"]+)['"]/g,
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /from\s+['"](@?[\w@/-]+)\/?['"]/g
  ],
  typescript: [
    /import\s+(?:{[^}]*}|\w+|\*\s+as\s+\w+)(?:\s*,\s*(?:{[^}]*}|\w+|\*\s+as\s+\w+))*\s+from\s+['"]([^'"]+)['"]/g,
    /import\s+type\s+(?:{[^}]*}|\w+)(?:\s*,\s*type\s+(?:{[^}]*}|\w+))*\s+from\s+['"]([^'"]+)['"]/g,
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g
  ],
  react: [
    /import\s+(?:{[^}]*}|\w+|\*\s+as\s+\w+)(?:\s*,\s*(?:{[^}]*}|\w+|\*\s+as\s+\w+))*\s+from\s+['"]([^'"]+)['"]/g,
    /from\s+['"]react['"]/gi,
    /from\s+['"](@?[\w@/-]+)\/?['"]/g
  ],
  vue: [
    /import\s+(?:{[^}]*}|\w+|\*\s+as\s+\w+)(?:\s*,\s*(?:{[^}]*}|\w+|\*\s+as\s+\w+))*\s+from\s+['"]([^'"]+)['"]/g,
    /<script[^>]*lang=["']ts["'][^>]*>/gi
  ],
  css: [
    /@import\s+(?:url\(['"]?([^'")]+)['"]?\)|['"]([^'"]+)['"])/g,
    /@use\s+['"]([^'"]+)['"]/g,
    /@forward\s+['"]([^'"]+)['"]/g
  ],
  html: [],
  svelte: [
    /import\s+(?:{[^}]*}|\w+|\*\s+as\s+\w+)(?:\s*,\s*(?:{[^}]*}|\w+|\*\s+as\s+\w+))*\s+from\s+['"]([^'"]+)['"]/g
  ],
  other: []
};

// Dépendances npm courantes à ignorer (internes ou standard)
const IGNORED_DEPENDENCIES = new Set([
  'react', 'react-dom', 'react/jsx-runtime', 'react-dom/client',
  'next', 'next/image', 'next/link', 'next/navigation', 'next/font',
  '@types/react', '@types/react-dom', '@types/node',
  'typescript', '@typescript-eslint',
  'tailwindcss', '@tailwindcss/postcss',
  'clsx', 'class-variance-authority', 'lucide-react',
  './', '../', '../..', '../../', '../', './'
]);

// Mapping des imports vers des packages npm
const NPM_PACKAGE_MAPPING: Record<string, string> = {
  // UI Libraries
  '@radix-ui/react-': '@radix-ui/react-',
  '@headlessui/react': '@headlessui/react',
  'lucide-react': 'lucide-react',
  'react-icons': 'react-icons',
  'framer-motion': 'framer-motion',

  // Utilities
  'clsx': 'clsx',
  'tailwind-merge': 'tailwind-merge',
  'date-fns': 'date-fns',
  'lodash': 'lodash',
  'axios': 'axios',
  'zustand': 'zustand',
  'jotai': 'jotai',
  'recoil': 'recoil',

  // Forms
  'react-hook-form': 'react-hook-form',
  'zod': 'zod',
  'yup': 'yup',

  // Data fetching
  '@tanstack/react-query': '@tanstack/react-query',
  'swr': 'swr',
  'useSWR': 'swr',

  // Styling
  'styled-components': 'styled-components',
  '@emotion/react': '@emotion/react',
  '@emotion/styled': '@emotion/styled',

  // Animation
  'auto-animate': '@formkit/auto-animate',
  'gsap': 'gsap',

  // Other
  'uuid': 'uuid',
  'nanoid': 'nanoid'
};

function detectLanguage(filename: string, content: string): ComponentLanguage {
  const ext = filename.toLowerCase().split('.').pop();

  const extMap: Record<string, ComponentLanguage> = {
    'tsx': content.includes('export default function') || content.includes('export const') ? 'react' : 'typescript',
    'jsx': 'react',
    'ts': 'typescript',
    'js': 'javascript',
    'vue': 'vue',
    'svelte': 'svelte',
    'css': 'css',
    'scss': 'css',
    'less': 'css',
    'html': 'html',
    'htm': 'html'
  };

  if (ext && extMap[ext]) {
    return extMap[ext];
  }

  // Analyse basée sur le contenu
  if (content.includes('import React') || content.includes('from "react"') || content.includes("from 'react'")) {
    return 'react';
  }
  if (content.includes('<template>') || content.includes('<script>')) {
    return 'vue';
  }
  if (content.includes('<script>') && content.includes('<style>')) {
    return 'svelte';
  }
  if (content.includes('@media') || content.includes('@keyframes')) {
    return 'css';
  }
  if (content.includes('<!DOCTYPE') || content.includes('<html')) {
    return 'html';
  }
  if (content.includes(': string') || content.includes(': number') || content.includes('interface ')) {
    return 'typescript';
  }

  return 'javascript';
}

function extractImports(content: string, language: ComponentLanguage): string[] {
  const patterns = IMPORT_PATTERNS[language] || [];
  const imports = new Set<string>();

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const importPath = match[1] || match[2];
      if (importPath) {
        imports.add(importPath);
      }
    }
  });

  return Array.from(imports);
}

function resolveNpmPackages(imports: string[]): string[] {
  const packages = new Set<string>();

  imports.forEach(imp => {
    // Ignorer les imports relatifs
    if (imp.startsWith('./') || imp.startsWith('../')) {
      return;
    }

    // Ignorer les dépendances ignorées
    if (IGNORED_DEPENDENCIES.has(imp)) {
      return;
    }

    // Vérifier le mapping direct
    for (const [pattern, pkg] of Object.entries(NPM_PACKAGE_MAPPING)) {
      if (imp.startsWith(pattern) || imp === pkg) {
        packages.add(pkg);
        return;
      }
    }

    // Pour les imports de type @namespace/package
    if (imp.startsWith('@')) {
      const parts = imp.split('/');
      if (parts.length >= 2) {
        packages.add(`${parts[0]}/${parts[1]}`);
      }
    } else {
      // Pour les imports simples sans scope
      const parts = imp.split('/');
      if (!imp.includes('/') && !imp.endsWith('.js') && !imp.endsWith('.ts')) {
        packages.add(parts[0]);
      }
    }
  });

  return Array.from(packages).sort();
}

function generateDescription(filename: string, content: string, language: ComponentLanguage): string {
  const name = filename.replace(/\.(tsx?|jsx?|vue|svelte|css|html)$/, '');

  // Extraire les commentaires au début du fichier
  const commentMatch = content.match(/^\/\*\*[\s\S]*?\*\/|^\/\/.*$/m);
  if (commentMatch) {
    const comment = commentMatch[0]
      .replace(/\/\*\*|\*\/|\*/g, '')
      .replace(/^\/\//gm, '')
      .trim();
    if (comment.length > 20 && comment.length < 500) {
      return comment;
    }
  }

  // Analyser le type de composant basé sur le contenu
  const descriptions: string[] = [];

  if (content.includes('onClick') || content.includes('onSubmit') || content.includes('onHover')) {
    descriptions.push('Composant interactif avec gestion d\'événements');
  }
  if (content.includes('useState') || content.includes('useEffect') || content.includes('useRef')) {
    descriptions.push('Utilise les hooks React');
  }
  if (content.includes('className') || content.includes('class=')) {
    descriptions.push('Stylisé avec CSS/Tailwind');
  }
  if (content.includes('children') || content.includes('props.children')) {
    descriptions.push('Accepte des enfants (children)');
  }
  if (content.includes('Map') || content.includes('.map(')) {
    descriptions.push('Affiche une liste d\'éléments');
  }
  if (content.includes('flex') || content.includes('grid')) {
    descriptions.push('Layout responsive avec Flexbox/Grid');
  }

  let desc = `Composant ${name} en ${language}`;
  if (descriptions.length > 0) {
    desc += '. ' + descriptions.join(', ');
  }

  return desc;
}

export function parseFile(filename: string, content: string): ParsedFile {
  const language = detectLanguage(filename, content);
  const imports = extractImports(content, language);
  const dependencies = resolveNpmPackages(imports);
  const description = generateDescription(filename, content, language);

  return {
    name: filename.replace(/\.(tsx?|jsx?|vue|svelte|css|html)$/, ''),
    code: content,
    language,
    dependencies,
    description
  };
}

export function parseMultipleFiles(files: { name: string; content: string }[]): ParsedFile[] {
  return files.map(file => parseFile(file.name, file.content));
}

// Lecture d'un fichier texte
export async function readFileAsText(file: File): Promise<string> {
  return file.text();
}

// Lecture récursive d'un dossier (via webkitdirectory)
export async function readDirectory(files: File[]): Promise<{ name: string; content: string }[]> {
  const results: { name: string; content: string }[] = [];

  for (const file of files) {
    // Ignorer les fichiers non pertinents
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['tsx', 'jsx', 'ts', 'js', 'vue', 'svelte', 'css', 'scss', 'html', 'htm'];

    if (!ext || !validExtensions.includes(ext)) {
      continue;
    }

    // Ignorer node_modules et dossiers cachés
    if (file.name.includes('node_modules') || file.name.startsWith('.')) {
      continue;
    }

    try {
      const content = await readFileAsText(file);
      // Garder le chemin relatif
      const name = file.webkitRelativePath || file.name;
      results.push({ name, content });
    } catch (e) {
      console.error(`Erreur lors de la lecture de ${file.name}:`, e);
    }
  }

  return results;
}

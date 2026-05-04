'use client';

import Groq from 'groq-sdk';
import { Component } from './types';

// Utiliser la clé API depuis localStorage ou demander à l'utilisateur
let groq: Groq | null = null;

export interface AIAnalysis {
  name: string;
  description: string;
  language: string;
  dependencies: string[];
  tags: string[];
  features: string[];
}

export function setApiKey(key: string) {
  groq = new Groq({ apiKey: key, dangerouslyAllowBrowser: true });
  localStorage.setItem('groq_api_key', key);
}

export function getApiKey(): string | null {
  return localStorage.getItem('groq_api_key');
}

export function clearApiKey() {
  groq = null;
  localStorage.removeItem('groq_api_key');
}

export function isApiKeySet(): boolean {
  return !!getApiKey() && !!groq;
}

export function initGroqFromStorage() {
  const key = getApiKey();
  if (key) {
    groq = new Groq({ apiKey: key, dangerouslyAllowBrowser: true });
  }
}

const SYSTEM_PROMPT = `Tu es un expert en développement web spécialisé dans l'analyse de composants de code.

Ta tâche est d'analyser le code fourni et d'extraire les informations suivantes au format JSON strict :

{
  "name": "nom_descriptif_du_composant",
  "description": "description_courte_et_claire_2_3_phrases",
  "language": "react|typescript|javascript|vue|svelte|css|html|other",
  "dependencies": ["package1", "package2"],
  "tags": ["tag1", "tag2", "tag3"],
  "features": ["fonctionnalité1", "fonctionnalité2"]
}

Règles importantes :
1. Le nom doit être descriptif et en français (ex: "Bouton avec icône" et non "Button")
2. La description doit expliquer ce que fait le composant et comment l'utiliser
3. Les dépendances doivent être des packages npm réels (ex: "lucide-react", "clsx")
4. Les tags doivent être pertinents pour la recherche (ex: "ui", "bouton", "responsive")
5. Les features doivent être des fonctionnalités clés du composant
6. Réponds UNIQUEMENT en JSON valide, sans texte supplémentaire
7. Si le code est incomplet, fais de ton mieux avec ce qui est fourni`;

async function analyzeWithAI(code: string, filename: string): Promise<AIAnalysis> {
  if (!groq) {
    throw new Error('Clé API Groq non configurée');
  }

  const prompt = `Analyse ce fichier de code :

Nom du fichier : ${filename}

\`\`\`
${code}
\`\`\`

Extrais les informations et réponds UNIQUEMENT en JSON valide.`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      response_format: { type: 'json_object' },
      max_tokens: 1000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Pas de réponse de l\'IA');
    }

    return JSON.parse(content) as AIAnalysis;
  } catch (error) {
    console.error('Erreur lors de l\'analyse IA:', error);
    throw error;
  }
}

// Analyse fallback si l'IA échoue
export function fallbackAnalysis(code: string, filename: string): AIAnalysis {
  const name = filename.replace(/\.(tsx?|jsx?|vue|svelte|css|html)$/, '').replace(/[-_]/g, ' ');

  let language = 'other';
  const ext = filename.split('.').pop()?.toLowerCase();
  const extMap: Record<string, string> = {
    'tsx': code.includes('export default') ? 'react' : 'typescript',
    'jsx': 'react',
    'ts': 'typescript',
    'js': 'javascript',
    'vue': 'vue',
    'svelte': 'svelte',
    'css': 'css',
    'html': 'html'
  };
  if (ext && extMap[ext]) {
    language = extMap[ext];
  }

  // Extraction basique des imports pour les dépendances
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  const dependencies: string[] = [];
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const dep = match[1];
    if (!dep.startsWith('./') && !dep.startsWith('../') && !dep.includes('/')) {
      dependencies.push(dep);
    }
  }

  return {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    description: `Composant ${name} en ${language}`,
    language,
    dependencies: [...new Set(dependencies)].slice(0, 5),
    tags: [language, 'component'],
    features: []
  };
}

export async function analyzeFileWithAI(code: string, filename: string): Promise<AIAnalysis> {
  if (!isApiKeySet()) {
    return fallbackAnalysis(code, filename);
  }

  try {
    return await analyzeWithAI(code, filename);
  } catch (error) {
    console.warn('Analyse IA échouée, utilisation du fallback:', error);
    return fallbackAnalysis(code, filename);
  }
}

export async function analyzeMultipleFilesWithAI(files: { name: string; code: string }[]): Promise<AIAnalysis[]> {
  if (!isApiKeySet()) {
    return files.map(f => fallbackAnalysis(f.code, f.name));
  }

  // Analyser en parallèle avec limite de 3 requêtes simultanées
  const results: AIAnalysis[] = [];
  const CHUNK_SIZE = 3;

  for (let i = 0; i < files.length; i += CHUNK_SIZE) {
    const chunk = files.slice(i, i + CHUNK_SIZE);
    const chunkResults = await Promise.allSettled(
      chunk.map(f => analyzeFileWithAI(f.code, f.name))
    );

    chunkResults.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        results.push(fallbackAnalysis(chunk[idx].code, chunk[idx].name));
      }
    });
  }

  return results;
}

// Génération de prompts améliorée avec IA
export async function generatePromptWithAI(component: { name: string; description: string; code: string; language: string }): Promise<string> {
  if (!isApiKeySet()) {
    return generateBasicPrompt(component);
  }

  try {
    const response = await groq!.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Tu es un expert en développement web. Génère un prompt détaillé pour aider un développeur à intégrer ce composant dans son projet.

Contraintes obligatoires à inclure dans le prompt :
- **Intégration** : Adapte automatiquement le composant à l'architecture de ce projet. Assure-toi que le composant est fonctionnel sans casser le reste de l'application. Gère correctement les imports, exports et dépendances.
- **Design & UI** : Reste bien dans le thème, le visuel et les couleurs de ce projet actuel. Le composant doit être responsive, toujours performant et scalable.

Le prompt doit inclure :
1. Comment utiliser le composant (étape par étape)
2. Comment le rendre réutilisable et scalable
3. Les dépendances nécessaires avec commandes d'installation
4. Des exemples d'utilisation concrets
5. Des conseils d'accessibilité et de responsive design

Réponds en français, de manière claire et structurée.`
        },
        {
          role: 'user',
          content: `Voici un composant que je veux intégrer :

Nom : ${component.name}
Langage : ${component.language}
Description : ${component.description}

Code :
\`\`\`${component.language}
${component.code}
\`\`\`

Génère un prompt complet pour l'intégrer dans un nouveau projet.`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1500
    });

    return response.choices[0]?.message?.content || generateBasicPrompt(component);
  } catch (error) {
    console.warn('Génération de prompt IA échouée:', error);
    return generateBasicPrompt(component);
  }
}

function generateBasicPrompt(component: { name: string; description: string; code: string; language: string }): string {
  return `Je souhaite intégrer un composant ${component.language} dans mon projet.

**Description :**
${component.description}

**Code :**
\`\`\`${component.language}
${component.code}
\`\`\`

**Contraintes d'intégration :**
Intègre ce composant dans ce projet en respectant les contraintes suivantes :

- **Intégration** : Adapte automatiquement le composant à l'architecture de ce projet. Assure-toi que le composant est fonctionnel sans casser le reste de l'application. Gère correctement les imports, exports et dépendances.
- **Design & UI** : Reste bien dans le thème, le visuel et les couleurs de ce projet actuel. Le composant doit être responsive, toujours performant et scalable.

**Ta tâche :**
1. Explique-moi comment utiliser ce composant dans mon projet
2. Indique-moi comment le rendre réutilisable et scalable
3. Donne-moi les dépendances nécessaires et comment les installer
4. Propose des exemples d'utilisation concrets`;
}

// Génère un prompt qui fusionne tous les composants d'un dossier en un seul composant unifié
export async function generateFolderPromptWithAI(components: Component[], folderName: string): Promise<string> {
  if (!isApiKeySet()) {
    return generateBasicFolderPrompt(components, folderName);
  }

  const componentsList = components.map((c, i) =>
    `### Composant ${i + 1} : ${c.name} (${c.language})\n**Description :** ${c.description}\n\`\`\`${c.language}\n${c.code}\n\`\`\``
  ).join('\n\n');

  try {
    const response = await groq!.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Tu es un architecte logiciel expert. Ta mission est d'analyser un ensemble de composants fournis et de générer UN SEUL prompt complet qui permet de les fusionner en un composant unifié, cohérent et fonctionnel.

Le prompt généré doit :
1. Expliquer clairement comment tous les composants fonctionnent ensemble
2. Proposer une architecture unifiée qui combine leurs fonctionnalités
3. Fournir le code du composant fusionné complet
4. Gérer les conflits (doublons de styles, fonctions similaires, etc.)
5. Lister toutes les dépendances nécessaires
6. Inclure des exemples d'utilisation du composant final

Contraintes obligatoires :
- **Intégration** : Le composant final doit être fonctionnel, avec les imports/exports corrects
- **Design & UI** : Design cohérent, responsive, performant
- **Code** : Propre, typé, bien structuré, avec des commentaires clairs

Réponds en français, de manière claire et structurée.`
        },
        {
          role: 'user',
          content: `Voici les ${components.length} composants du dossier "${folderName}" à fusionner :

${componentsList}

Génère un prompt complet pour créer un composant unifié qui combine toutes ces fonctionnalités.`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 3000
    });

    return response.choices[0]?.message?.content || generateBasicFolderPrompt(components, folderName);
  } catch (error) {
    console.warn('Génération de prompt dossier IA échouée:', error);
    return generateBasicFolderPrompt(components, folderName);
  }
}

function generateBasicFolderPrompt(components: Component[], folderName: string): string {
  const componentsList = components.map((c, i) =>
    `${i + 1}. **${c.name}** (${c.language}) — ${c.description}`
  ).join('\n');

  const codeBlocks = components.map(c =>
    `### ${c.name}\n\`\`\`${c.language}\n${c.code}\n\`\`\``
  ).join('\n\n');

  return `Je souhaite fusionner les ${components.length} composants suivants du dossier "${folderName}" en un seul composant unifié :

${componentsList}

${codeBlocks}

**Contraintes d'intégration :**
- **Fusion** : Combine toutes les fonctionnalités en un composant cohérent et fonctionnel
- **Design & UI** : Design unifié, responsive, performant
- **Code** : Propre, bien structuré, réutilisable

**Ta tâche :**
1. Analyse chaque composant et identifie les liens entre eux
2. Propose une architecture unifiée
3. Fournis le code du composant fusionné complet
4. Liste les dépendances nécessaires
5. Donne des exemples d'utilisation concrets`;
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { Component } from '@/lib/types';

interface ComponentDetailProps {
  component: Component;
  onClose: () => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
  html: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  css: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  react: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  typescript: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  vue: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  svelte: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
};

export default function ComponentDetail({ component, onClose }: ComponentDetailProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [previewError, setPreviewError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Générer le HTML de preview
  const generatePreviewHtml = () => {
    const isReact = component.language === 'react' || component.language === 'typescript';
    const isVue = component.language === 'vue';
    const isSvelte = component.language === 'svelte';
    const isHtml = component.language === 'html';
    const isCss = component.language === 'css';
    const isJs = component.language === 'javascript';

    let bodyContent = '';
    let headScripts = '';
    let headStyles = '';

    if (isHtml) {
      // Pour HTML, on utilise le code directement
      bodyContent = component.code;
    } else if (isCss) {
      // Pour CSS, on crée un contenu de démonstration
      headStyles = `<style>${component.code}</style>`;
      bodyContent = `
        <div class="preview-container">
          <h1>Aperçu CSS</h1>
          <p class="demo-text">Voici un exemple de texte avec vos styles appliqués.</p>
          <button class="demo-button">Bouton exemple</button>
          <div class="demo-card">
            <h3>Carte exemple</h3>
            <p>Ceci est une carte avec vos styles CSS.</p>
          </div>
          <a href="#" class="demo-link">Lien exemple</a>
        </div>
      `;
    } else if (isJs) {
      // Pour JavaScript, on crée un conteneur et on exécute le code
      bodyContent = `
        <div class="preview-container">
          <h1>Composant JavaScript</h1>
          <div id="js-output">
            <p>Le code JavaScript a été exécuté.</p>
            <p>Consultez la console du navigateur pour voir les résultats.</p>
          </div>
        </div>
      `;
      headScripts = `
        <script>
          try {
            (function() {
              ${component.code}
            })();
          } catch(e) {
            console.error('Erreur JavaScript:', e);
            document.getElementById('js-output').innerHTML += '<p style="color:red; margin-top:10px;">Erreur: ' + e.message + '</p>';
          }
        <\/script>
      `;
    } else if (isReact) {
      // Pour React, on utilise Babel pour compiler le JSX
      bodyContent = `
        <div class="preview-container react-preview">
          <div class="react-icon">⚛️</div>
          <h1>Composant React</h1>
          <p>Les composants React nécessitent un environnement React complet.</p>
          <div id="root"></div>
        </div>
      `;
      headScripts = `
        <script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
        <script type="text/babel">
          try {
            const { createElement } = React;
            const { createRoot } = ReactDOM;

            // Composant de démo
            const DemoComponent = () => {
              return createElement('div', { className: 'react-demo' },
                createElement('h2', null, 'Preview React'),
                createElement('p', null, 'Pour un rendu complet, utilisez votre environnement de développement.')
              );
            };

            const root = createRoot(document.getElementById('root'));
            root.render(createElement(DemoComponent));
          } catch(e) {
            console.error('Erreur React:', e);
          }
        <\/script>
      `;
    } else if (isVue) {
      bodyContent = `
        <div class="preview-container vue-preview">
          <div class="vue-icon">🖖</div>
          <h1>Composant Vue</h1>
          <p>Les composants Vue nécessitent un environnement Vue complet.</p>
        </div>
      `;
    } else if (isSvelte) {
      bodyContent = `
        <div class="preview-container svelte-preview">
          <div class="svelte-icon">🔥</div>
          <h1>Composant Svelte</h1>
          <p>Les composants Svelte nécessitent une compilation.</p>
        </div>
      `;
    } else {
      bodyContent = `
        <div class="preview-container">
          <h1>Aperçu non disponible</h1>
          <p>Le langage "${component.language}" ne supporte pas la prévisualisation directe.</p>
        </div>
      `;
    }

    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview - ${component.name}</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  ${headStyles}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; width: 100%; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #ffffff;
      color: #1a1a1a;
      overflow: auto;
    }
    .preview-container {
      max-width: 100%;
      min-height: 100vh;
      padding: 40px 20px;
    }
    .react-preview, .vue-preview, .svelte-preview {
      text-align: center;
      padding: 80px 20px;
    }
    .react-icon, .vue-icon, .svelte-icon {
      font-size: 80px;
      margin-bottom: 20px;
    }
    .preview-container h1 {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 16px;
    }
    .preview-container h2 {
      font-size: 24px;
      color: #1a1a1a;
      margin-bottom: 12px;
    }
    .preview-container p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    .preview-container a {
      color: #3b82f6;
      text-decoration: none;
    }
    .preview-container a:hover {
      text-decoration: underline;
    }
    .preview-container button {
      padding: 10px 20px;
      margin: 10px 0;
      border: none;
      border-radius: 6px;
      background: #3b82f6;
      color: white;
      cursor: pointer;
      font-size: 14px;
    }
    .preview-container button:hover {
      background: #2563eb;
    }
    .preview-container input, .preview-container textarea {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      width: 100%;
      max-width: 400px;
      margin: 10px 0;
    }
    .demo-text {
      font-size: 16px;
      line-height: 1.8;
      color: #333;
      margin-bottom: 20px;
    }
    .demo-card {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .demo-link {
      color: #3b82f6;
      text-decoration: underline;
      cursor: pointer;
    }
    #root {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  ${bodyContent}
  ${headScripts}
</body>
</html>`;
  };

  // Force le rechargement de l'iframe quand l'onglet preview est activé
  useEffect(() => {
    if (activeTab === 'preview' && iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.srcdoc = generatePreviewHtml();
    }
  }, [activeTab, component.id]);

  // Générer le prompt IA fonctionnel
  const generateFunctionalPrompt = (): string => {
    return `Intègre le composant "${component.name}" dans mon projet en respectant le style de mon site.

**Description du composant :**
${component.description}

**Code source (${component.language}) :**
\`\`\`${component.language}
${component.code}
\`\`\`

${component.dependencies && component.dependencies.length > 0 ? `**Dépendances nécessaires :**
${component.dependencies.map(d => `- ${d}`).join('\n')}` : ''}

**Requirements :**
1. Adapte les couleurs pour qu'elles correspondent à ma charte graphique
2. Rends le composant **scalable** : il doit pouvoir être réutilisé facilement avec différentes props/configurations
3. Assure qu'il soit **responsive** : fonctionne parfaitement sur mobile, tablette et desktop
4. Maintiens la fonctionnalité originale tout en l'intégrant proprement
5. Si le composant a des états (hover, active, focus), garde-les cohérents avec le reste du site
6. Fournis le code complet avec les imports nécessaires

**Sortie attendue :**
Le code complet du composant intégré, prêt à être copié-collé dans mon projet.`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(component.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generateFunctionalPrompt());
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleIframeError = () => {
    setPreviewError('Le preview ne peut pas être affiché pour ce type de composant');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                {component.name}
              </h2>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${LANGUAGE_COLORS[component.language] || LANGUAGE_COLORS.other}`}>
                {component.language}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
              {component.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'preview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'code'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Code
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'preview' ? (
            <div className="flex-1 bg-white">
              {previewError ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  {previewError}
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                  onError={handleIframeError}
                />
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-auto p-4 sm:p-6">
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{component.code}</code>
                </pre>
                <button
                  onClick={handleCopyCode}
                  className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                  title="Copier le code"
                >
                  {copiedCode ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AI Prompt Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Prompt IA pour l'intégration
            </h3>
            <button
              onClick={handleCopyPrompt}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              {copiedPrompt ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copié !
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copier le prompt
                </>
              )}
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 max-h-48 overflow-y-auto">
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
              {generateFunctionalPrompt()}
            </p>
          </div>
        </div>

        {/* Tags and Dependencies */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-wrap gap-4">
          {component.tags.length > 0 && (
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Tags</p>
              <div className="flex flex-wrap gap-1">
                {component.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {component.dependencies && component.dependencies.length > 0 && (
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Dépendances</p>
              <div className="flex flex-wrap gap-1">
                {component.dependencies.map((dep, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded">
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

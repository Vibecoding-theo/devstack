import { Component } from './types';

const LANGUAGE_INSTRUCTIONS: Record<string, string> = {
  html: 'ce composant HTML pur',
  css: 'ce composant CSS pur',
  javascript: 'ce composant JavaScript (vanilla)',
  react: 'ce composant React',
  typescript: 'ce composant TypeScript/React',
  vue: 'ce composant Vue',
  svelte: 'ce composant Svelte',
  other: 'ce composant'
};

export function generateIntegrationPrompt(component: Component): string {
  const language = LANGUAGE_INSTRUCTIONS[component.language] || 'ce composant';
  const deps = component.dependencies?.length ? '\n\nDépendances nécessaires :\n' + component.dependencies.map(d => `- ${d}`).join('\n') : '';
  const tags = component.tags.length ? `\n\nTags : ${component.tags.join(', ')}` : '';

  return `Je souhaite intégrer ${language} dans mon projet.

**Description du composant :**
${component.description}

**Code source :**
\`\`\`${component.language}
${component.code}
\`\`\`
${deps}
${tags}

**Contraintes d'intégration :**
Intègre ce composant dans ce projet en respectant les contraintes suivantes :

- **Intégration** : Adapte automatiquement le composant à l'architecture de ce projet. Assure-toi que le composant est fonctionnel sans casser le reste de l'application. Gère correctement les imports, exports et dépendances.
- **Design & UI** : Reste bien dans le thème, le visuel et les couleurs de ce projet actuel. Le composant doit être responsive, toujours performant et scalable.

**Ta tâche :**
1. Explique-moi comment utiliser ce composant dans mon projet (étape par étape)
2. Indique-moi comment le rendre réutilisable et scalable (props, configuration, etc.)
3. Donne-moi des exemples d'utilisation concrets
4. Signale toutes les dépendances nécessaires et comment les installer
5. Propose des améliorations potentielles pour le rendre plus modulaire`;
}

export function generateRefactorPrompt(component: Component): string {
  const language = LANGUAGE_INSTRUCTIONS[component.language] || 'ce composant';

  return `Je souhaite refactoriser ${language} pour le rendre plus réutilisable et maintenable.

**Description :**
${component.description}

**Code actuel :**
\`\`\`${component.language}
${component.code}
\`\`\`

**Ta tâche :**
1. Analyse le code actuel et identifie les problèmes potentiels
2. Propose une version refactorisée avec :
   - Séparation des responsabilités
   - Meilleure organisation du code
   - Props/configuration clairement définies
   - Documentation intégrée
3. Explique les changements apportés et pourquoi ils améliorent le code
4. Propose des tests unitaires si applicable`;
}

export function generateTestPrompt(component: Component): string {
  return `Je souhaite créer des tests pour le composant suivant :

**Nom :** ${component.name}
**Description :** ${component.description}
**Langage :** ${component.language}

**Code :**
\`\`\`${component.language}
${component.code}
\`\`\`

**Ta tâche :**
1. Analyse le composant et identifie les cas de test à couvrir
2. Écris des tests unitaires complets (choisis le framework de test approprié)
3. Inclue des tests edge cases et error handling
4. Explique comment exécuter ces tests dans mon projet`;
}

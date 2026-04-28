'use client';

import { Component, ComponentFormData, ComponentLanguage } from '@/lib/types';

interface ComponentFormProps {
  component?: Component;
  onSave: (data: ComponentFormData) => void;
  onCancel: () => void;
}

const LANGUAGES: { value: ComponentLanguage; label: string }[] = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript/React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'other', label: 'Autre' }
];

const INPUT_CLASSES = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-sm";
const TEXTAREA_CLASSES = INPUT_CLASSES + " resize-none";
const LABEL_CLASSES = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function ComponentForm({ component, onSave, onCancel }: ComponentFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSave({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      code: formData.get('code') as string,
      language: formData.get('language') as ComponentLanguage,
      tags: formData.get('tags') as string,
      dependencies: formData.get('dependencies') as string || undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            {component ? 'Modifier le composant' : 'Nouveau composant'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div>
            <label htmlFor="name" className={LABEL_CLASSES}>
              Nom *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={component?.name}
              required
              autoComplete="off"
              className={INPUT_CLASSES}
              placeholder="Ex: Button, Modal, Card..."
            />
          </div>

          <div>
            <label htmlFor="description" className={LABEL_CLASSES}>
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={component?.description}
              required
              rows={2}
              className={TEXTAREA_CLASSES}
              placeholder="Description du composant et de son usage..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="language" className={LABEL_CLASSES}>
                Langage *
              </label>
              <select
                id="language"
                name="language"
                defaultValue={component?.language || 'react'}
                required
                className={INPUT_CLASSES}
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags" className={LABEL_CLASSES}>
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                defaultValue={component?.tags.join(', ')}
                autoComplete="off"
                className={INPUT_CLASSES}
                placeholder="ui, button, modal..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="code" className={LABEL_CLASSES}>
              Code source *
            </label>
            <textarea
              id="code"
              name="code"
              defaultValue={component?.code}
              required
              rows={10}
              className={TEXTAREA_CLASSES + " font-mono text-xs sm:text-sm"}
              placeholder="Collez votre code ici..."
            />
          </div>

          <div>
            <label htmlFor="dependencies" className={LABEL_CLASSES}>
              Dépendances (optionnel)
            </label>
            <input
              id="dependencies"
              name="dependencies"
              type="text"
              defaultValue={component?.dependencies?.join(', ')}
              autoComplete="off"
              className={INPUT_CLASSES}
              placeholder="react-icons, tailwindcss, lodash..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Séparez les dépendances par des virgules
            </p>
          </div>
        </form>

        <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              {component ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

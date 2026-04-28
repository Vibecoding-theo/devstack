'use client';

interface EmptyStateProps {
  onNew: () => void;
}

export default function EmptyState({ onNew }: EmptyStateProps) {
  return (
    <div className="text-center py-12 sm:py-16 px-4">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Aucun composant
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-6 max-w-md mx-auto">
        Commencez par ajouter votre premier composant réutilisable
      </p>
      <button
        onClick={onNew}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter un composant
      </button>
    </div>
  );
}

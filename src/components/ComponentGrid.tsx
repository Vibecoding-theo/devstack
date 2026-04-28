'use client';

import { Component } from '@/lib/types';
import ComponentCard from './ComponentCard';

interface ComponentGridProps {
  components: Component[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  viewMode: 'grid' | 'list';
}

export default function ComponentGrid({ components, onView, onEdit, onDelete, viewMode }: ComponentGridProps) {
  if (components.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 px-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Aucun résultat
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Essayez une autre recherche
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={viewMode === 'grid'
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
        : 'space-y-4 max-w-4xl mx-auto'
      }>
        {components.map(component => (
          <ComponentCard
            key={component.id}
            component={component}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        {components.length} composant{components.length > 1 ? 's' : ''} affiché{components.length > 1 ? 's' : ''}
      </p>
    </>
  );
}

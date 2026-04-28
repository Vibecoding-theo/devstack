'use client';

import { useState, useEffect } from 'react';
import { Component, ComponentFormData } from '@/lib/types';
import { storage } from '@/lib/storage';
import { initGroqFromStorage } from '@/lib/aiService';
import Header from '@/components/Header';
import Toolbar from '@/components/Toolbar';
import ComponentGrid from '@/components/ComponentGrid';
import EmptyState from '@/components/EmptyState';
import ComponentForm from '@/components/ComponentForm';
import SmartImportDialog from '@/components/SmartImportDialog';
import ApiKeyDialog from '@/components/ApiKeyDialog';
import ComponentDetail from '@/components/ComponentDetail';

export default function AppPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSmartImport, setShowSmartImport] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [notification, setNotification] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    initGroqFromStorage();
    loadComponents();
  }, []);

  const loadComponents = () => {
    const loaded = storage.getComponents();
    setComponents(loaded);
    setFilteredComponents(loaded);
  };

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = components.filter(comp =>
      comp.name.toLowerCase().includes(lowerQuery) ||
      comp.description.toLowerCase().includes(lowerQuery) ||
      comp.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    setFilteredComponents(filtered);
  };

  const handleSave = (data: ComponentFormData) => {
    const tags = data.tags
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);
    const dependencies = data.dependencies
      ?.split(',')
      .map(d => d.trim())
      .filter(d => d.length > 0);

    if (editingId) {
      storage.updateComponent(editingId, {
        name: data.name,
        description: data.description,
        code: data.code,
        language: data.language,
        tags,
        dependencies
      });
      showNotification('Composant mis à jour');
    } else {
      const newComponent: Component = {
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description,
        code: data.code,
        language: data.language,
        tags,
        dependencies,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      storage.addComponent(newComponent);
      showNotification('Composant créé');
    }

    loadComponents();
    setShowForm(false);
    setEditingId(null);
  };

  const handleSmartImport = (componentDataList: ComponentFormData[]) => {
    let count = 0;
    componentDataList.forEach(data => {
      const tags = data.tags
        .split(',')
        .map(t => t.trim().toLowerCase())
        .filter(t => t.length > 0);
      const dependencies = data.dependencies
        ?.split(',')
        .map(d => d.trim())
        .filter(d => d.length > 0);

      const newComponent: Component = {
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description,
        code: data.code,
        language: data.language,
        tags,
        dependencies,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      storage.addComponent(newComponent);
      count++;
    });

    loadComponents();
    showNotification(`${count} composant${count > 1 ? 's' : ''} importé${count > 1 ? 's' : ''}`);
  };

  const handleView = (id: string) => {
    setViewingId(id);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce composant ?')) {
      storage.deleteComponent(id);
      loadComponents();
      showNotification('Composant supprimé');
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    setSelectedIds(new Set(filteredComponents.map(c => c.id)));
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    const count = selectedIds.size;
    if (count === 0) return;
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${count} composant${count > 1 ? 's' : ''} ?`)) {
      storage.deleteMultipleComponents(Array.from(selectedIds));
      setSelectedIds(new Set());
      setSelectionMode(false);
      loadComponents();
      showNotification(`${count} composant${count > 1 ? 's' : ''} supprimé${count > 1 ? 's' : ''}`);
    }
  };

  const handleToggleSelectionMode = () => {
    setSelectionMode(prev => !prev);
    setSelectedIds(new Set());
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleExport = () => {
    const json = storage.exportComponents();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devstack-components-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Export réussi');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const text = await file.text();
      const result = storage.importComponents(text);
      if (result.success) {
        loadComponents();
        showNotification(`${result.count} composant(s) importé(s)`);
      } else {
        showNotification(`Erreur: ${result.error}`);
      }
    };
    input.click();
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const editingComponent = editingId ? components.find(c => c.id === editingId) : undefined;
  const viewingComponent = viewingId ? components.find(c => c.id === viewingId) : undefined;

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}

      {showForm && (
        <ComponentForm
          component={editingComponent}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {showSmartImport && (
        <SmartImportDialog
          onImport={handleSmartImport}
          onClose={() => setShowSmartImport(false)}
        />
      )}

      {showApiKeyDialog && (
        <ApiKeyDialog
          onClose={() => setShowApiKeyDialog(false)}
        />
      )}

      {viewingComponent && (
        <ComponentDetail
          component={viewingComponent}
          onClose={() => setViewingId(null)}
        />
      )}

      <Header
        onImport={handleImport}
        onSmartImport={() => setShowSmartImport(true)}
        onExport={handleExport}
        onApiKeyClick={() => setShowApiKeyDialog(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Toolbar
          onSearch={handleSearch}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onNew={() => setShowForm(true)}
          onSmartImport={() => setShowSmartImport(true)}
          selectionMode={selectionMode}
          selectedCount={selectedIds.size}
          totalCount={filteredComponents.length}
          onToggleSelectionMode={handleToggleSelectionMode}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onBulkDelete={handleBulkDelete}
        />

        {components.length === 0 ? (
          <EmptyState onNew={() => setShowForm(true)} />
        ) : (
          <ComponentGrid
            components={filteredComponents}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            viewMode={viewMode}
            selectionMode={selectionMode}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
          />
        )}
      </main>
    </div>
  );
}

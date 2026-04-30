'use client';

import { useState, useEffect } from 'react';
import { Component, ComponentFormData } from '@/lib/types';
import { storage } from '@/lib/storage';
import { initGroqFromStorage } from '@/lib/aiService';
import AppHeader from '@/components/app/AppHeader';
import StatsBar from '@/components/app/StatsBar';
import ComponentGrid from '@/components/app/ComponentGrid';
import EmptyState from '@/components/app/EmptyState';
import ComponentDetail from '@/components/app/ComponentDetail';
import SmartImportDialog from '@/components/app/SmartImportDialog';
import ApiKeyDialog from '@/components/app/ApiKeyDialog';
import '@/app/app.css';

export default function AppDashboard() {
  const [components, setComponents] = useState<Component[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [showSmartImport, setShowSmartImport] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    initGroqFromStorage();
    loadComponents();
  }, []);

  const loadComponents = () => {
    const loaded = storage.getComponents();
    setComponents(loaded);
    applySearch(searchQuery, loaded);
  };

  const applySearch = (query: string, comps?: Component[]) => {
    const list = comps || components;
    const q = query.toLowerCase();
    const filtered = q
      ? list.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.tags.some((t) => t.toLowerCase().includes(q))
        )
      : list;
    setFilteredComponents(filtered);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    applySearch(query);
  };

  const handleSmartImport = (dataList: ComponentFormData[]) => {
    let count = 0;
    dataList.forEach((data) => {
      const tags = data.tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t.length > 0);
      const dependencies = data.dependencies
        ?.split(',')
        .map((d) => d.trim())
        .filter((d) => d.length > 0);

      storage.addComponent({
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description,
        code: data.code,
        language: data.language,
        tags,
        dependencies,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      count++;
    });
    loadComponents();
    showNotif(`${count} composant${count > 1 ? 's' : ''} importé${count > 1 ? 's' : ''}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce composant ?')) {
      storage.deleteComponent(id);
      loadComponents();
      setViewingId(null);
      showNotif('Composant supprimé');
    }
  };

  const showNotif = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const viewingComponent = viewingId
    ? components.find((c) => c.id === viewingId)
    : undefined;

  return (
    <div className="app-page">
      {notification && (
        <div className="notification">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {notification}
        </div>
      )}

      <AppHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSmartImport={() => setShowSmartImport(true)}
        onApiKeyClick={() => setShowApiKeyDialog(true)}
        componentCount={components.length}
      />

      <main className="app-main">
        {components.length === 0 ? (
          <EmptyState onImport={() => setShowSmartImport(true)} />
        ) : (
          <>
            <StatsBar components={filteredComponents} />
            <ComponentGrid
              components={filteredComponents}
              onView={(id) => setViewingId(id)}
              onDelete={handleDelete}
            />
          </>
        )}
      </main>

      {showSmartImport && (
        <SmartImportDialog
          onImport={handleSmartImport}
          onClose={() => setShowSmartImport(false)}
        />
      )}

      {showApiKeyDialog && (
        <ApiKeyDialog onClose={() => setShowApiKeyDialog(false)} />
      )}

      {viewingComponent && (
        <ComponentDetail
          component={viewingComponent}
          onClose={() => setViewingId(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

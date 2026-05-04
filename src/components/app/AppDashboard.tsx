'use client';

import { useState, useEffect } from 'react';
import { Component, ComponentFormData, Folder } from '@/lib/types';
import { storage, UserRole, ROLE_LIMITS } from '@/lib/storage';
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
  const [userRole, setUserRole] = useState<UserRole>('free');
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    initGroqFromStorage();
    loadComponents();
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUserRole(data.user?.role || 'free');
          setAuthChecked(true);
        } else {
          window.location.href = '/auth?redirect=/app';
        }
      })
      .catch(() => {
        window.location.href = '/auth?redirect=/app';
      });
  }, []);

  const loadComponents = () => {
    const loaded = storage.getComponents();
    setComponents(loaded);
    setFolders(storage.getFolders());
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
    if (!storage.canAddComponents(userRole, dataList.length)) {
      const limit = ROLE_LIMITS[userRole];
      const remaining = storage.getRemainingSlots(userRole);
      showNotif(`Limite atteinte : ${isFinite(limit) ? `${limit} composants max` : 'illimité'}. ${isFinite(remaining) ? `Il te reste ${remaining} place${remaining > 1 ? 's' : ''}.` : ''} Passe au Premium pour plus !`);
      return;
    }

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
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      loadComponents();
      setViewingId(null);
      showNotif('Composant supprimé');
    }
  };

  const showNotif = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkDelete = () => {
    const count = selectedIds.size;
    if (count === 0) return;
    if (!confirm(`Supprimer ${count} composant${count > 1 ? 's' : ''} ?`)) return;
    storage.deleteMultipleComponents([...selectedIds]);
    setSelectedIds(new Set());
    loadComponents();
    showNotif(`${count} composant${count > 1 ? 's' : ''} supprimé${count > 1 ? 's' : ''}`);
  };

  const handleMoveToFolder = (componentId: string, folderId: string | null) => {
    storage.moveComponentsToFolder([componentId], folderId);
    loadComponents();
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
        userRole={userRole}
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
              selectedIds={selectedIds}
              onToggleSelect={toggleSelect}
              folders={folders}
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
          folders={folders}
          onMoveToFolder={handleMoveToFolder}
        />
      )}

      {selectedIds.size > 0 && (
        <div className="bulk-action-bar">
          <span className="bulk-count">
            {selectedIds.size} sélectionné{selectedIds.size > 1 ? 's' : ''}
          </span>
          <div className="bulk-actions">
            <button
              className="bulk-btn select-all"
              onClick={() => {
                if (selectedIds.size === filteredComponents.length) {
                  setSelectedIds(new Set());
                } else {
                  setSelectedIds(new Set(filteredComponents.map((c) => c.id)));
                }
              }}
            >
              {selectedIds.size === filteredComponents.length ? 'Tout désélectionner' : 'Tout sélectionner'}
            </button>
            <button
              className="bulk-btn delete-all"
              onClick={handleBulkDelete}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer ({selectedIds.size})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

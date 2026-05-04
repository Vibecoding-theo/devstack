'use client';

import { useState, useEffect, useMemo } from 'react';
import { Component, ComponentFormData, Folder } from '@/lib/types';
import { storage, UserRole, ROLE_LIMITS } from '@/lib/storage';
import { initGroqFromStorage, generateFolderPromptWithAI } from '@/lib/aiService';
import AppHeader from '@/components/app/AppHeader';
import StatsBar from '@/components/app/StatsBar';
import ComponentGrid from '@/components/app/ComponentGrid';
import EmptyState from '@/components/app/EmptyState';
import ComponentDetail from '@/components/app/ComponentDetail';
import SmartImportDialog from '@/components/app/SmartImportDialog';
import ApiKeyDialog from '@/components/app/ApiKeyDialog';
import FolderSidebar from '@/components/app/FolderSidebar';
import '../app.css';

export default function AppPage() {
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
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [bulkFolderMenuOpen, setBulkFolderMenuOpen] = useState(false);
  const [folderPrompt, setFolderPrompt] = useState<string | null>(null);
  const [folderPromptLoading, setFolderPromptLoading] = useState(false);

  const applyFilters = (query: string, folderId: string | null, comps?: Component[]) => {
    const list = comps || components;
    let filtered = folderId
      ? list.filter(c => c.folderId === folderId)
      : list;
    const q = query.toLowerCase();
    if (q) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    setFilteredComponents(filtered);
  };

  const loadComponents = () => {
    const loaded = storage.getComponents();
    setComponents(loaded);
    setFolders(storage.getFolders());
    applyFilters(searchQuery, selectedFolderId, loaded);
  };

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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedFolderId);
  };

  const handleSelectFolder = (id: string | null) => {
    setSelectedFolderId(id);
    setSelectedIds(new Set());
    applyFilters(searchQuery, id);
  };

  const folderCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    components.forEach(c => {
      if (c.folderId) {
        counts[c.folderId] = (counts[c.folderId] || 0) + 1;
      }
    });
    return counts;
  }, [components]);

  const handleCreateFolder = (name: string, color: string) => {
    storage.addFolder({
      id: crypto.randomUUID(),
      name,
      color,
      createdAt: new Date().toISOString(),
    });
    loadComponents();
    showNotif(`Dossier \u201c${name}\u201d créé`);
  };

  const handleRenameFolder = (id: string, name: string) => {
    storage.updateFolder(id, { name });
    loadComponents();
  };

  const handleDeleteFolder = (id: string) => {
    storage.deleteFolder(id);
    if (selectedFolderId === id) {
      setSelectedFolderId(null);
    }
    loadComponents();
    showNotif('Dossier supprimé');
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
        folderId: selectedFolderId ?? undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      count++;
    });
    loadComponents();
    showNotif(`${count} composant${count > 1 ? 's' : ''} import\u00e9${count > 1 ? 's' : ''}`);
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
      showNotif('Composant supprim\u00e9');
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
    const folder = folderId ? folders.find(f => f.id === folderId) : null;
    showNotif(folder ? `Déplacé dans \u201c${folder.name}\u201d` : 'Retiré du dossier');
  };

  const handleBulkMoveToFolder = (folderId: string | null) => {
    const count = selectedIds.size;
    storage.moveComponentsToFolder([...selectedIds], folderId);
    setBulkFolderMenuOpen(false);
    setSelectedIds(new Set());
    loadComponents();
    const folder = folderId ? folders.find(f => f.id === folderId) : null;
    showNotif(folder
      ? `${count} composant${count > 1 ? 's' : ''} déplacé${count > 1 ? 's' : ''} dans \u201c${folder.name}\u201d`
      : `${count} composant${count > 1 ? 's' : ''} retiré${count > 1 ? 's' : ''} du dossier`
    );
  };

  const handleFolderPrompt = async () => {
    if (!selectedFolderId || filteredComponents.length === 0) return;
    const folderName = folders.find(f => f.id === selectedFolderId)?.name || 'Dossier';
    setFolderPromptLoading(true);
    setFolderPrompt(null);
    try {
      const result = await generateFolderPromptWithAI(filteredComponents, folderName);
      setFolderPrompt(result);
    } catch {
      setFolderPrompt('Erreur lors de la génération du prompt.');
    } finally {
      setFolderPromptLoading(false);
    }
  };

  const viewingComponent = viewingId
    ? components.find((c) => c.id === viewingId)
    : undefined;

  if (!authChecked) {
    return (
      <div className="app-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
          <div className="payment-spinner" style={{ margin: '0 auto 16px' }} />
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

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

      <div className="app-layout">
        <FolderSidebar
          folders={folders}
          selectedFolderId={selectedFolderId}
          onSelectFolder={handleSelectFolder}
          onCreateFolder={handleCreateFolder}
          onRenameFolder={handleRenameFolder}
          onDeleteFolder={handleDeleteFolder}
          componentCounts={folderCounts}
          totalComponents={components.length}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="app-main">
          {selectedFolderId && (
            <div className="folder-breadcrumb">
              <button className="breadcrumb-link" onClick={() => handleSelectFolder(null)}>
                Tous les composants
              </button>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="breadcrumb-current">
                {folders.find(f => f.id === selectedFolderId)?.name}
              </span>
              <span className="breadcrumb-count">
                {filteredComponents.length} composant{filteredComponents.length !== 1 ? 's' : ''}
              </span>
              {filteredComponents.length > 0 && (
                <button
                  className="btn-folder-prompt"
                  onClick={handleFolderPrompt}
                  disabled={folderPromptLoading}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  {folderPromptLoading ? 'Analyse en cours...' : 'Fusionner avec l\'IA'}
                </button>
              )}
            </div>
          )}

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
      </div>

      {showSmartImport && (
        <SmartImportDialog
          onImport={handleSmartImport}
          onClose={() => setShowSmartImport(false)}
        />
      )}

      {showApiKeyDialog && (
        <ApiKeyDialog onClose={() => setShowApiKeyDialog(false)} />
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

            <div className="bulk-folder-wrap">
              <button
                className="bulk-btn move-folder"
                onClick={() => setBulkFolderMenuOpen(!bulkFolderMenuOpen)}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                Déplacer
              </button>
              {bulkFolderMenuOpen && (
                <div className="bulk-folder-menu">
                  <button
                    className="bulk-folder-option"
                    onClick={() => handleBulkMoveToFolder(null)}
                  >
                    Non classé
                  </button>
                  {folders.map((f) => (
                    <button
                      key={f.id}
                      className="bulk-folder-option"
                      onClick={() => handleBulkMoveToFolder(f.id)}
                    >
                      <span className="bulk-folder-dot" style={{ background: f.color }} />
                      {f.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

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

      {folderPrompt && (
        <div className="prompt-overlay" onClick={() => setFolderPrompt(null)}>
          <div className="prompt-panel" onClick={(e) => e.stopPropagation()}>
            <div className="prompt-header">
              <div className="prompt-header-left">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3>Prompt de fusion — {folders.find(f => f.id === selectedFolderId)?.name}</h3>
              </div>
              <button className="detail-close" onClick={() => setFolderPrompt(null)}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prompt-body">
              <div className="prompt-content-text">{folderPrompt}</div>
            </div>
            <div className="prompt-footer">
              <button
                className="btn-cancel"
                onClick={() => setFolderPrompt(null)}
              >
                Fermer
              </button>
              <button
                className="btn-import-confirm"
                onClick={async () => {
                  await navigator.clipboard.writeText(folderPrompt);
                  showNotif('Prompt copié !');
                }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copier le prompt
              </button>
            </div>
          </div>
        </div>
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
    </div>
  );
}

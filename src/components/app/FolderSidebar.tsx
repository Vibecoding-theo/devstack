'use client';

import { useState } from 'react';
import { Folder } from '@/lib/types';

const FOLDER_COLORS = [
  '#a78bfa', '#22d3ee', '#4ade80', '#facc15',
  '#fb923c', '#f87171', '#f472b6', '#818cf8',
];

interface FolderSidebarProps {
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectFolder: (id: string | null) => void;
  onCreateFolder: (name: string, color: string) => void;
  onRenameFolder: (id: string, name: string) => void;
  onDeleteFolder: (id: string) => void;
  componentCounts: Record<string, number>;
  totalComponents: number;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function FolderSidebar({
  folders,
  selectedFolderId,
  onSelectFolder,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  componentCounts,
  totalComponents,
  collapsed,
  onToggleCollapse,
}: FolderSidebarProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(FOLDER_COLORS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleCreate = () => {
    if (!newName.trim()) return;
    onCreateFolder(newName.trim(), newColor);
    setNewName('');
    setNewColor(FOLDER_COLORS[Math.floor(Math.random() * FOLDER_COLORS.length)]);
    setShowCreate(false);
  };

  const handleRename = (id: string) => {
    if (!editName.trim()) return;
    onRenameFolder(id, editName.trim());
    setEditingId(null);
    setEditName('');
  };

  if (collapsed) {
    return (
      <button className="folder-toggle-collapsed" onClick={onToggleCollapse} title="Dossiers">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </button>
    );
  }

  return (
    <aside className="folder-sidebar">
      <div className="folder-sidebar-header">
        <div className="folder-sidebar-title">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span>Dossiers</span>
        </div>
        <div className="folder-sidebar-actions">
          <button
            className="folder-btn-icon"
            onClick={() => setShowCreate(true)}
            title="Nouveau dossier"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="folder-btn-icon" onClick={onToggleCollapse} title="Masquer">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="folder-nav">
        <button
          className={`folder-nav-item ${selectedFolderId === null ? 'active' : ''}`}
          onClick={() => onSelectFolder(null)}
        >
          <div className="folder-nav-icon all">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <span className="folder-nav-label">Tous</span>
          <span className="folder-nav-count">{totalComponents}</span>
        </button>

        {folders.map((folder) => {
          const count = componentCounts[folder.id] || 0;
          const isEditing = editingId === folder.id;

          return (
            <div
              key={folder.id}
              className={`folder-nav-item ${selectedFolderId === folder.id ? 'active' : ''}`}
              onClick={() => !isEditing && onSelectFolder(folder.id)}
            >
              <div
                className="folder-nav-icon"
                style={{ background: `${folder.color}20`, color: folder.color }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>

              {isEditing ? (
                <input
                  className="folder-edit-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleRename(folder.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename(folder.id);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span className="folder-nav-label">{folder.name}</span>
              )}

              <span className="folder-nav-count">{count}</span>

              <div className="folder-item-actions">
                <button
                  className="folder-item-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(folder.id);
                    setEditName(folder.name);
                  }}
                  title="Renommer"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="12" height="12">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  className="folder-item-btn delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Supprimer le dossier \u201c${folder.name}\u201d ? Les composants seront déplacés dans \u201cTous\u201d.`)) {
                      onDeleteFolder(folder.id);
                      if (selectedFolderId === folder.id) onSelectFolder(null);
                    }
                  }}
                  title="Supprimer"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="12" height="12">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </nav>

      {showCreate && (
        <div className="folder-create" onClick={(e) => e.stopPropagation()}>
          <input
            className="folder-create-input"
            placeholder="Nom du dossier..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreate();
              if (e.key === 'Escape') setShowCreate(false);
            }}
            autoFocus
          />
          <div className="folder-color-picker">
            {FOLDER_COLORS.map((c) => (
              <button
                key={c}
                className={`folder-color-dot ${newColor === c ? 'selected' : ''}`}
                style={{ background: c }}
                onClick={() => setNewColor(c)}
              />
            ))}
          </div>
          <div className="folder-create-actions">
            <button className="folder-create-cancel" onClick={() => setShowCreate(false)}>Annuler</button>
            <button
              className="folder-create-confirm"
              onClick={handleCreate}
              disabled={!newName.trim()}
            >
              Créer
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

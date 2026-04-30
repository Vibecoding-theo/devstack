'use client';

import { useState, useCallback, useEffect } from 'react';
import { ComponentFormData, ComponentLanguage } from '@/lib/types';
import { readDirectory, ParsedFile } from '@/lib/fileParser';
import { analyzeMultipleFilesWithAI, AIAnalysis, isApiKeySet } from '@/lib/aiService';

interface SmartImportDialogProps {
  onImport: (components: ComponentFormData[]) => void;
  onClose: () => void;
}

interface FileWithAnalysis extends ParsedFile {
  aiAnalysis?: AIAnalysis;
  useAI: boolean;
}

export default function SmartImportDialog({ onImport, onClose }: SmartImportDialogProps) {
  const [files, setFiles] = useState<FileWithAnalysis[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);

  useEffect(() => {
    setAiEnabled(isApiKeySet());
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const items = Array.from(e.dataTransfer.items);
    const fileObjs: File[] = [];
    for (const item of items) {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) fileObjs.push(file);
      }
    }
    if (fileObjs.length > 0) await processFiles(fileObjs);
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObjs = e.target.files;
    if (fileObjs && fileObjs.length > 0) await processFiles(Array.from(fileObjs));
  };

  const processFiles = async (fileObjs: File[]) => {
    setIsLoading(true);
    try {
      const dirFiles = await readDirectory(fileObjs);
      const parsedFiles = dirFiles.map((f) => parseFile(f.name, f.content));
      const filesWithAI: FileWithAnalysis[] = parsedFiles.map((f) => ({
        ...f,
        useAI: aiEnabled,
      }));
      setFiles(filesWithAI);
      setSelectedFiles(new Set(filesWithAI.map((_, i) => i)));
      if (aiEnabled && useAI) await analyzeWithAI(filesWithAI);
    } catch {
      // silent
    } finally {
      setIsLoading(false);
    }
  };

  const parseFile = (name: string, content: string): ParsedFile => {
    const ext = name.split('.').pop()?.toLowerCase() || '';
    const langMap: Record<string, ComponentLanguage> = {
      tsx: content.includes('export default') ? 'react' : 'typescript',
      jsx: 'react',
      ts: 'typescript',
      js: 'javascript',
      vue: 'vue',
      svelte: 'svelte',
      css: 'css',
      scss: 'css',
      html: 'html',
    };
    const language = langMap[ext] || 'other';
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    const dependencies: string[] = [];
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const dep = match[1];
      if (!dep.startsWith('./') && !dep.startsWith('../')) dependencies.push(dep);
    }
    const fileName = name.replace(/\.(tsx?|jsx?|vue|svelte|css|html)$/, '').replace(/[-_]/g, ' ');
    return {
      name: fileName.charAt(0).toUpperCase() + fileName.slice(1),
      code: content,
      language,
      dependencies: [...new Set(dependencies)].slice(0, 5),
      description: `Composant ${fileName} en ${language}`,
    };
  };

  const analyzeWithAI = async (filesToAnalyze: FileWithAnalysis[]) => {
    setIsAnalyzing(true);
    try {
      const analyses = await analyzeMultipleFilesWithAI(
        filesToAnalyze.map((f) => ({ name: f.name, code: f.code }))
      );
      setFiles((prev) =>
        prev.map((file, i) => ({ ...file, aiAnalysis: analyses[i] }))
      );
    } catch {
      // silent
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleAIAnalysis = async () => {
    if (useAI) {
      setUseAI(false);
      setFiles((prev) => prev.map((f) => ({ ...f, useAI: false })));
    } else {
      setUseAI(true);
      setFiles((prev) => prev.map((f) => ({ ...f, useAI: true })));
      await analyzeWithAI(files.map((f) => ({ ...f, useAI: true })));
    }
  };

  const toggleSelection = (index: number) => {
    const next = new Set(selectedFiles);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setSelectedFiles(next);
  };

  const toggleAll = () => {
    if (selectedFiles.size === files.length) setSelectedFiles(new Set());
    else setSelectedFiles(new Set(files.map((_, i) => i)));
  };

  const handleImport = () => {
    const componentsToImport: ComponentFormData[] = [];
    selectedFiles.forEach((index) => {
      const file = files[index];
      const analysis = file.useAI && file.aiAnalysis ? file.aiAnalysis : null;
      componentsToImport.push({
        name: analysis?.name || file.name,
        description: analysis?.description || file.description,
        code: file.code,
        language: (analysis?.language as ComponentLanguage) || file.language,
        tags: analysis?.tags?.join(', ') || file.language,
        dependencies: analysis?.dependencies?.join(', ') || file.dependencies.join(', '),
      });
    });
    onImport(componentsToImport);
    onClose();
  };

  const clearFiles = () => {
    setFiles([]);
    setSelectedFiles(new Set());
    setUseAI(false);
  };

  const getFileData = (file: FileWithAnalysis) => {
    if (file.useAI && file.aiAnalysis) return file.aiAnalysis;
    return { ...file, tags: [file.language, 'component'] } as AIAnalysis | (ParsedFile & { tags: string[] });
  };

  return (
    <div className="import-overlay" onClick={onClose}>
      <div className="import-panel" onClick={(e) => e.stopPropagation()}>
        <div className="import-header">
          <div className="import-header-left">
            <div className="import-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 className="import-title">Import intelligent</h2>
              <p className="import-subtitle">Analyse automatique avec l&apos;IA</p>
            </div>
          </div>
          <button className="import-close" onClick={onClose}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="import-body">
          {files.length === 0 ? (
            <div
              className={`dropzone ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="dropzone-glow" />
              <div className="dropzone-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="dropzone-title">Glisse tes fichiers ici</h3>
              <p className="dropzone-desc">Fichiers ou dossiers de composants (.tsx, .jsx, .ts, .js, .vue, .svelte, .css, .html)</p>
              <label className="btn-select-files">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Sélectionner des fichiers
                <input
                  type="file"
                  multiple
                  {...({ webkitdirectory: '' } as any)}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".tsx,.jsx,.ts,.js,.vue,.svelte,.css,.scss,.html"
                />
              </label>
            </div>
          ) : (
            <>
              <div className="file-list-header">
                <div className="file-list-info">
                  <button className="btn-toggle-all" onClick={toggleAll}>
                    {selectedFiles.size === files.length ? 'Tout désélectionner' : 'Tout sélectionner'}
                  </button>
                  <span className="file-count">{selectedFiles.size} / {files.length} sélectionné(s)</span>
                </div>
                <div className="file-list-actions">
                  {aiEnabled && (
                    <button
                      className={`btn-ai-toggle ${useAI ? 'on' : 'off'}`}
                      onClick={toggleAIAnalysis}
                      disabled={isAnalyzing}
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      {isAnalyzing ? 'Analyse...' : useAI ? 'IA activée' : 'Activer IA'}
                    </button>
                  )}
                  <button className="btn-clear" onClick={clearFiles}>Effacer</button>
                </div>
              </div>

              <div className="file-grid">
                {files.map((file, index) => {
                  const data = getFileData(file);
                  return (
                    <div
                      key={index}
                      className={`file-card ${selectedFiles.has(index) ? 'selected' : ''}`}
                      onClick={() => toggleSelection(index)}
                    >
                      <div className="file-card-check">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="file-card-body">
                        <div className="file-card-name">{data.name}</div>
                        <div className="file-card-desc">{data.description}</div>
                        <div className="file-card-badges">
                          <span className="file-badge file-badge-lang">{data.language}</span>
                          {file.aiAnalysis && (
                            <span className="file-badge file-badge-ai">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              IA
                            </span>
                          )}
                          {(data.dependencies || []).slice(0, 2).map((dep, i) => (
                            <span key={i} className="file-badge file-badge-dep">{dep}</span>
                          ))}
                          {(data.dependencies || []).length > 2 && (
                            <span className="file-badge file-badge-more">+{(data.dependencies || []).length - 2}</span>
                          )}
                          {data.tags?.slice(0, 2).map((tag: string, i: number) => (
                            <span key={i} className="file-badge file-badge-tag">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {files.length > 0 && (
          <div className="import-footer">
            <button className="btn-cancel" onClick={onClose}>Annuler</button>
            <button
              className="btn-import-confirm"
              onClick={handleImport}
              disabled={selectedFiles.size === 0 || isAnalyzing}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Importer {selectedFiles.size} composant{selectedFiles.size > 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

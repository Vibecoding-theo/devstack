'use client';

import { useState, useCallback, useEffect } from 'react';
import { Component, ComponentFormData, ComponentLanguage } from '@/lib/types';
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

    if (fileObjs.length > 0) {
      await processFiles(fileObjs);
    }
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObjs = e.target.files;
    if (fileObjs && fileObjs.length > 0) {
      await processFiles(Array.from(fileObjs));
    }
  };

  const processFiles = async (fileObjs: File[]) => {
    setIsLoading(true);
    try {
      const dirFiles = await readDirectory(fileObjs);
      const parsedFiles = dirFiles.map(f => parseFile(f.name, f.content));
      const filesWithAI: FileWithAnalysis[] = parsedFiles.map(f => ({
        ...f,
        useAI: aiEnabled
      }));

      setFiles(filesWithAI);
      setSelectedFiles(new Set(filesWithAI.map((_, i) => i)));

      // Analyser avec IA si activé
      if (aiEnabled && useAI) {
        await analyzeWithAI(filesWithAI);
      }
    } catch (error) {
      console.error('Erreur lors du traitement des fichiers:', error);
      alert('Erreur lors du traitement des fichiers');
    } finally {
      setIsLoading(false);
    }
  };

  const parseFile = (name: string, content: string): ParsedFile => {
    const ext = name.split('.').pop()?.toLowerCase() || '';
    const langMap: Record<string, ComponentLanguage> = {
      'tsx': content.includes('export default') ? 'react' : 'typescript',
      'jsx': 'react',
      'ts': 'typescript',
      'js': 'javascript',
      'vue': 'vue',
      'svelte': 'svelte',
      'css': 'css',
      'scss': 'css',
      'html': 'html'
    };

    const language = langMap[ext] || 'other';

    // Extraction basique des imports
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    const dependencies: string[] = [];
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const dep = match[1];
      if (!dep.startsWith('./') && !dep.startsWith('../')) {
        dependencies.push(dep);
      }
    }

    const fileName = name.replace(/\.(tsx?|jsx?|vue|svelte|css|html)$/, '').replace(/[-_]/g, ' ');
    const description = `Composant ${fileName} en ${language}`;

    return {
      name: fileName.charAt(0).toUpperCase() + fileName.slice(1),
      code: content,
      language,
      dependencies: [...new Set(dependencies)].slice(0, 5),
      description
    };
  };

  const analyzeWithAI = async (filesToAnalyze: FileWithAnalysis[]) => {
    setIsAnalyzing(true);
    try {
      const analyses = await analyzeMultipleFilesWithAI(
        filesToAnalyze.map(f => ({ name: f.name, code: f.code }))
      );

      setFiles(prev => prev.map((file, i) => ({
        ...file,
        aiAnalysis: analyses[i]
      })));
    } catch (error) {
      console.error('Erreur lors de l\'analyse IA:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleAIAnalysis = async () => {
    if (useAI) {
      setUseAI(false);
      setFiles(prev => prev.map(f => ({ ...f, useAI: false })));
    } else {
      setUseAI(true);
      setFiles(prev => prev.map(f => ({ ...f, useAI: true })));
      await analyzeWithAI(files.map(f => ({ ...f, useAI: true })));
    }
  };

  const toggleSelection = (index: number) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedFiles(newSelected);
  };

  const toggleAll = () => {
    if (selectedFiles.size === files.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map((_, i) => i)));
    }
  };

  const handleImport = () => {
    const componentsToImport: ComponentFormData[] = [];

    selectedFiles.forEach(index => {
      const file = files[index];
      const analysis = file.useAI && file.aiAnalysis ? file.aiAnalysis : null;

      componentsToImport.push({
        name: analysis?.name || file.name,
        description: analysis?.description || file.description,
        code: file.code,
        language: analysis?.language as ComponentLanguage || file.language,
        tags: analysis?.tags?.join(', ') || file.language,
        dependencies: analysis?.dependencies?.join(', ') || file.dependencies.join(', ')
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
    if (file.useAI && file.aiAnalysis) {
      return file.aiAnalysis;
    }
    // Fallback avec des tags par défaut
    return {
      ...file,
      tags: [file.language, 'component']
    } as AIAnalysis | (ParsedFile & { tags: string[] });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Import intelligent
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Analyse automatique avec IA
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {files.length === 0 ? (
            <div
              className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-colors ${dragActive
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Glissez vos fichiers ici
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                Importez des fichiers ou dossiers de composants
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={toggleAll}
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    {selectedFiles.size === files.length ? 'Tout désélectionner' : 'Tout sélectionner'}
                  </button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedFiles.size} / {files.length} sélectionné(s)
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {aiEnabled && (
                    <button
                      onClick={toggleAIAnalysis}
                      disabled={isAnalyzing}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        useAI
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      {isAnalyzing ? 'Analyse en cours...' : useAI ? 'IA activée' : 'Activer l\'IA'}
                    </button>
                  )}
                  <button
                    onClick={clearFiles}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline"
                  >
                    Effacer
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {files.map((file, index) => {
                  const data = getFileData(file);
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedFiles.has(index)
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => toggleSelection(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <input
                            type="checkbox"
                            checked={selectedFiles.has(index)}
                            onChange={() => toggleSelection(index)}
                            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h4 className="font-medium text-gray-900 dark:text-white truncate">
                              {data.name}
                            </h4>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                              {data.language}
                            </span>
                            {file.aiAnalysis && (
                              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                IA
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                            {data.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {(data.dependencies || []).slice(0, 3).map((dep, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded"
                              >
                                {dep}
                              </span>
                            ))}
                            {(data.dependencies || []).length > 3 && (
                              <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded">
                                +{(data.dependencies || []).length - 3}
                              </span>
                            )}
                          </div>
                          {data.tags && data.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {data.tags.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {data.tags.length > 3 && (
                                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded">
                                  +{data.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleImport}
                disabled={selectedFiles.size === 0 || isAnalyzing}
                className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium"
              >
                Importer {selectedFiles.size} composant{selectedFiles.size > 1 ? 's' : ''}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

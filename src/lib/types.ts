export type ComponentLanguage = 'html' | 'css' | 'javascript' | 'react' | 'typescript' | 'vue' | 'svelte' | 'other';

export interface Folder {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface Component {
  id: string;
  name: string;
  description: string;
  code: string;
  language: ComponentLanguage;
  tags: string[];
  dependencies?: string[];
  folderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComponentFormData {
  name: string;
  description: string;
  code: string;
  language: ComponentLanguage;
  tags: string;
  dependencies?: string;
}

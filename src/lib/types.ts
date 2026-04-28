export type ComponentLanguage = 'html' | 'css' | 'javascript' | 'react' | 'typescript' | 'vue' | 'svelte' | 'other';

export interface Component {
  id: string;
  name: string;
  description: string;
  code: string;
  language: ComponentLanguage;
  tags: string[];
  dependencies?: string[];
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

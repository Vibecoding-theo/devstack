'use client';

import { Component } from './types';

const STORAGE_KEY = 'devstack_components';

export const storage = {
  getComponents(): Component[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveComponents(components: Component[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(components));
  },

  addComponent(component: Component): void {
    const components = this.getComponents();
    components.unshift(component);
    this.saveComponents(components);
  },

  updateComponent(id: string, updates: Partial<Component>): void {
    const components = this.getComponents();
    const index = components.findIndex(c => c.id === id);
    if (index !== -1) {
      components[index] = { ...components[index], ...updates, updatedAt: new Date().toISOString() };
      this.saveComponents(components);
    }
  },

  deleteComponent(id: string): void {
    const components = this.getComponents().filter(c => c.id !== id);
    this.saveComponents(components);
  },

  deleteMultipleComponents(ids: string[]): void {
    const idSet = new Set(ids);
    const components = this.getComponents().filter(c => !idSet.has(c.id));
    this.saveComponents(components);
  },

  exportComponents(): string {
    return JSON.stringify(this.getComponents(), null, 2);
  },

  importComponents(json: string): { success: boolean; count: number; error?: string } {
    try {
      const components = JSON.parse(json);
      if (!Array.isArray(components)) {
        return { success: false, count: 0, error: 'Format invalide : attendu un tableau' };
      }

      const existing = this.getComponents();
      const existingIds = new Set(existing.map(c => c.id));
      let count = 0;

      components.forEach((comp: Component) => {
        if (comp.id && comp.name && comp.code && !existingIds.has(comp.id)) {
          existing.unshift(comp);
          existingIds.add(comp.id);
          count++;
        }
      });

      this.saveComponents(existing);
      return { success: true, count };
    } catch (e) {
      return { success: false, count: 0, error: 'JSON invalide' };
    }
  }
};

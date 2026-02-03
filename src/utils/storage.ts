import { Page } from '@/types/page';

const STORAGE_KEY = 'myclonenotion_pages';

export const storage = {
  getPages: (): Page[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading pages from localStorage:', error);
      return [];
    }
  },

  savePages: (pages: Page[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    } catch (error) {
      console.error('Error saving pages to localStorage:', error);
    }
  },

  savePage: (page: Page): void => {
    const pages = storage.getPages();
    const index = pages.findIndex(p => p.id === page.id);
    
    if (index >= 0) {
      pages[index] = page;
    } else {
      pages.push(page);
    }
    
    storage.savePages(pages);
  },

  deletePage: (id: string): void => {
    const pages = storage.getPages();
    const filtered = pages.filter(p => p.id !== id);
    storage.savePages(filtered);
  },

  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
};

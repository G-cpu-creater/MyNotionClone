import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { Page, PageStore } from '@/types/page';
import { storage } from '@/utils/storage';

export const usePageStore = create<PageStore>((set, get) => ({
  pages: [],
  activePageId: null,

  loadPages: () => {
    const pages = storage.getPages();
    
    // If no pages exist, create a default one
    if (pages.length === 0) {
      const defaultPage: Page = {
        id: nanoid(),
        title: 'Getting Started',
        content: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      storage.savePage(defaultPage);
      set({ pages: [defaultPage], activePageId: defaultPage.id });
    } else {
      set({ pages });
    }
  },

  createPage: (parentId?: string) => {
    const newPage: Page = {
      id: nanoid(),
      title: 'Untitled',
      content: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      parentId: parentId || null,
    };

    storage.savePage(newPage);
    set((state) => ({
      pages: [...state.pages, newPage],
      activePageId: newPage.id,
    }));

    return newPage;
  },

  updatePage: (id: string, updates: Partial<Page>) => {
    const pages = get().pages;
    const pageIndex = pages.findIndex((p) => p.id === id);

    if (pageIndex === -1) return;

    const updatedPage = {
      ...pages[pageIndex],
      ...updates,
      updatedAt: Date.now(),
    };

    storage.savePage(updatedPage);

    set((state) => ({
      pages: state.pages.map((p) => (p.id === id ? updatedPage : p)),
    }));
  },

  deletePage: (id: string) => {
    storage.deletePage(id);
    
    set((state) => {
      const newPages = state.pages.filter((p) => p.id !== id);
      const newActivePageId = state.activePageId === id 
        ? (newPages.length > 0 ? newPages[0].id : null)
        : state.activePageId;
      
      return {
        pages: newPages,
        activePageId: newActivePageId,
      };
    });
  },

  setActivePageId: (id: string | null) => {
    set({ activePageId: id });
  },

  getPage: (id: string) => {
    return get().pages.find((p) => p.id === id);
  },
}));

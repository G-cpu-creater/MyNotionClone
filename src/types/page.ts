export interface Page {
  id: string;
  title: string;
  content: any | null; // Yoopta Editor JSON content
  createdAt: number;
  updatedAt: number;
  parentId?: string | null;
  isArchived?: boolean;
}

export interface PageStore {
  pages: Page[];
  activePageId: string | null;
  
  // Actions
  createPage: (parentId?: string) => Page;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  setActivePageId: (id: string | null) => void;
  getPage: (id: string) => Page | undefined;
  loadPages: () => void;
}

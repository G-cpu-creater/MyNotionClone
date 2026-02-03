'use client';

import { usePageStore } from '@/store/pageStore';
import { useRouter } from 'next/navigation';
import { FileText, Plus, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export default function Sidebar() {
  const { pages, activePageId, createPage, setActivePageId, loadPages } = usePageStore();
  const router = useRouter();

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  const handleCreatePage = () => {
    const newPage = createPage();
    router.push(`/page/${newPage.id}`);
  };

  const handlePageClick = (pageId: string) => {
    setActivePageId(pageId);
    router.push(`/page/${pageId}`);
  };

  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-800">MyCloneNotion</h1>
      </div>

      {/* New Page Button */}
      <div className="p-3">
        <button
          onClick={handleCreatePage}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
        >
          <Plus size={16} />
          <span>New Page</span>
        </button>
      </div>

      {/* Page List */}
      <div className="flex-1 overflow-y-auto px-2">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => handlePageClick(page.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors mb-1 ${
              activePageId === page.id
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileText size={16} className="flex-shrink-0" />
            <span className="truncate flex-1 text-left">
              {page.title || 'Untitled'}
            </span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 text-xs text-gray-500">
        {pages.length} {pages.length === 1 ? 'page' : 'pages'}
      </div>
    </div>
  );
}

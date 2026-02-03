'use client';

import { usePageStore } from '@/store/pageStore';
import { useState, useEffect, useCallback } from 'react';

interface PageHeaderProps {
  pageId: string;
}

export default function PageHeader({ pageId }: PageHeaderProps) {
  const { getPage, updatePage } = usePageStore();
  const page = getPage(pageId);
  const [title, setTitle] = useState(page?.title || 'Untitled');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (page) {
      setTitle(page.title || 'Untitled');
    }
  }, [page]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (page && title !== page.title) {
      updatePage(pageId, { title });
    }
  }, [pageId, title, page, updatePage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    }
  };

  if (!page) return null;

  return (
    <div className="px-20 py-8">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-4xl font-bold w-full outline-none bg-transparent"
          autoFocus
        />
      ) : (
        <h1
          onClick={() => setIsEditing(true)}
          className="text-4xl font-bold cursor-text hover:bg-gray-50 px-2 -mx-2 rounded"
        >
          {title}
        </h1>
      )}
    </div>
  );
}

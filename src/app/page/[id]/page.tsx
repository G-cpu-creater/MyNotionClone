'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/PageHeader';
import EditorContainer from '@/components/EditorContainer';
import YooptaEditorWrapper from '@/editor/YooptaEditorWrapper';
import { usePageStore } from '@/store/pageStore';

export default function PageView() {
  const params = useParams();
  const pageId = params.id as string;
  const { setActivePageId, loadPages } = usePageStore();

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  useEffect(() => {
    if (pageId) {
      setActivePageId(pageId);
    }
  }, [pageId, setActivePageId]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <EditorContainer>
        <PageHeader pageId={pageId} />
        <YooptaEditorWrapper pageId={pageId} />
      </EditorContainer>
    </div>
  );
}

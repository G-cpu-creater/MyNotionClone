'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePageStore } from '@/store/pageStore';
import Sidebar from '@/components/Sidebar';

export default function HomePage() {
  const router = useRouter();
  const { pages, loadPages } = usePageStore();

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  useEffect(() => {
    // Redirect to first page if available
    if (pages.length > 0) {
      router.push(`/page/${pages[0].id}`);
    }
  }, [pages, router]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-gray-500">
          <p className="text-lg">Welcome to MyCloneNotion</p>
          <p className="text-sm mt-2">Create a new page to get started</p>
        </div>
      </div>
    </div>
  );
}

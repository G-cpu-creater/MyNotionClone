'use client';

import { ReactNode } from 'react';

interface EditorContainerProps {
  children: ReactNode;
}

export default function EditorContainer({ children }: EditorContainerProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
}

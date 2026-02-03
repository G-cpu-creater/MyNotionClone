'use client';

import YooptaEditor, { createYooptaEditor } from '@yoopta/editor';
import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Code from '@yoopta/code';
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
import { BulletedList, NumberedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import Link from '@yoopta/link';
import Image from '@yoopta/image';
import File from '@yoopta/file';
import Video from '@yoopta/video';
import Embed from '@yoopta/embed';
import Callout from '@yoopta/callout';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePageStore } from '@/store/pageStore';

interface YooptaEditorWrapperProps {
  pageId: string;
}

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  Code,
  Link,
  Image.extend({
    options: {
      async onUpload(file) {
        const data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        return { src: data };
      },
    },
  }),
  File.extend({
    options: {
      async onUpload(file) {
        return {
          src: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
        };
      },
    },
  }),
  Video.extend({
    options: {
      async onUpload(file) {
        return { src: URL.createObjectURL(file) };
      },
    },
  }),
  Embed,
  BulletedList,
  NumberedList,
  TodoList,
];

const marks = [Bold, Italic, CodeMark, Underline, Strike];

const TOOLS = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
};

export default function YooptaEditorWrapper({ pageId }: YooptaEditorWrapperProps) {
  const { getPage, updatePage } = usePageStore();
  const page = getPage(pageId);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const editorRef = useRef<any>(null);

  const editor = useMemo(() => createYooptaEditor(), []);

  useEffect(() => {
    if (page?.content && editor) {
      try {
        editor.setEditorValue(page.content);
      } catch (error) {
        console.error('Error loading editor content:', error);
      }
    }
  }, [pageId, editor]);

  const handleChange = (value: any) => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for autosave (2 seconds debounce)
    saveTimeoutRef.current = setTimeout(() => {
      updatePage(pageId, { content: value });
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  if (!page) {
    return <div className="p-20 text-gray-500">Page not found</div>;
  }

  return (
    <div className="px-20 py-6">
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        marks={marks}
        tools={TOOLS}
        placeholder="Type / for commands..."
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
}

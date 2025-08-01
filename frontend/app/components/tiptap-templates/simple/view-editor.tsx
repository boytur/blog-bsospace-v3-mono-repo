"use client"
import * as React from "react"
import { EditorContent, useEditor, JSONContent } from "@tiptap/react"
import dynamic from 'next/dynamic'

// Core Extensions
import { StarterKit } from "@tiptap/starter-kit"
import { Image as TiptapImage } from "@tiptap/extension-image"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"
import { TiptapImageNodeView } from "@/app/components/tiptap-node/image-node/TiptapImageNodeView";
import { ReactNodeViewRenderer } from "@tiptap/react";

// Custom Extensions
import { Link } from "@/app/components/tiptap-extension/link-extension"
import { Selection } from "@/app/components/tiptap-extension/selection-extension"
import { TrailingNode } from "@/app/components/tiptap-extension/trailing-node-extension"
import Loading from "../../Loading"

interface PreviewEditorProps {
  content: JSONContent
}

export function PreviewEditor({ content }: PreviewEditorProps) {
  const editor = useEditor({
    editable: false,
    immediatelyRender: false, // แก้ไข SSR error
    extensions: [
      StarterKit.configure({}),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem,
      Highlight,
      Superscript,
      Subscript,
      Typography,
      TiptapImage.extend({
        addNodeView() {
          return ReactNodeViewRenderer(TiptapImageNodeView);
        },
      }),
      Selection,
      TrailingNode,
      Link.configure({ openOnClick: true }),
    ],
    content,
  })

  if (!editor) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        Loading preview...
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="transition-all rounded-md duration-300 max-w-screen-xl w-full ease-out sticky top-16 bg-white dark:bg-gray-900  dark:border-gray-700 shadow-sm">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

// Export dynamic version to prevent SSR issues
export const DynamicPreviewEditor = dynamic(() => Promise.resolve(PreviewEditor), {
  ssr: false,
  loading: () => (
    <div className="text-center text-gray-500 dark:text-gray-400 py-12">
      <Loading />
    </div>
  ),
})

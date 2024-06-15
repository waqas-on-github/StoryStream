"use client";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
import Image from "@tiptap/extension-image";

export const useEditorConfig = ({
  onChange,
}: {
  onChange: (markdown: string) => void;
}) => {
  // console.log("props form editor ");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Markdown,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "link",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "wola",
        },
      }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }), // Configure the Heading extension to include H1
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "paragraph") {
            return "Start writing from here....";
          }

          return "Can you add some further context?";
        },
      }),
    ],

    onUpdate: ({ editor }) => {
      onChange(editor?.storage.markdown.getMarkdown());
    },
    autofocus: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class: `text-editor__editor`,
      },
    },
  });

  return editor;
};

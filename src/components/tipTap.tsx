"use client"
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Bold, UnderlineIcon } from 'lucide-react';
import { Italic } from 'lucide-react';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder'
import '../app/editor.css'



const TextEditor = () => {


    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Paragraph.configure({
                HTMLAttributes: {
                    class: "wola"
                }
            }), Placeholder.configure({
                // Use a placeholder:

                placeholder: "ADD HEADING",
                includeChildren: true,

            }),

        ],
        autofocus: true,
        injectCSS: false,
        editorProps: {
            attributes: {
                class: `text-editor__editor`,
            }
        },




    });

    const logContent = () => {
        if (editor) {
            console.log(editor.getHTML());
        }
    };

    const addBold = () => {
        if (editor) {
            editor.chain().focus().toggleBold().run();
        }
    };

    const addItalic = () => {
        if (editor) {
            editor.chain().focus().toggleItalic().run();
        }
    };

    const addUnderline = () => {
        if (editor) {
            editor.chain().focus().toggleUnderline().run();
        }
    };

    return (
        <div className=' w-[90%] md:w-[80%] bg-gray-100 p-[20px] mt-10 ' >
            <div >
                <button onClick={addBold} >< Bold size={15} /></button>
                <button onClick={addItalic}><Italic size={15} /></button>
                <button onClick={addUnderline}><UnderlineIcon size={15} /></button>

            </div>

            <EditorContent placeholder="Enter the text" editor={editor} />


        </div>
    );
};

export default TextEditor;

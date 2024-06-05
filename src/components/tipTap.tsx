"use client"
import React, { useCallback } from 'react';
import { EditorContent } from '@tiptap/react';
import { Bold, Heading1, Link, List, ListOrdered, UnderlineIcon } from 'lucide-react';
import { Italic } from 'lucide-react';
import '../app/editor.css'
import { useEditorConfig } from './useEditorConfig';
import { Button } from './ui/button';
import { usePostData } from '@/hooks/usePostData';



const TextEditor = () => {
    const { mutate, isPending, } = usePostData()

    const editor = useEditorConfig()


    const logContent = () => {
        if (editor) {
            mutate(editor?.getJSON())
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


    const orderdList = () => {
        if (editor) editor.chain().focus().toggleOrderedList().run()
    }

    const bulitList = () => editor && editor.chain().focus().toggleBulletList().run()

    const setLink = useCallback(() => {

        const previousUrl = editor?.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run()

            return
        }

        // update link
        editor?.chain().focus().extendMarkRange('link').setLink({ href: url, class: 'some-class' }).run()


    }, [editor])


    const addHeading = () => editor && editor?.chain().focus().toggleHeading({ level: 1 }).run()

    if (!editor) {
        return null
    }
    return (
        <div className=' w-[90%] md:w-[80%] bg-[#171717] p-[20px] mt-10 ' >
            <div className='text-white bg-[#090909] p-4 flex gap-4' >
                <button onClick={addHeading} ><Heading1 /></button>
                <button onClick={addBold} >< Bold /></button>
                <button onClick={addItalic}><Italic /></button>
                <button onClick={addUnderline}><UnderlineIcon /></button>
                <button onClick={setLink} className={editor?.isActive('link') ? 'is-active' : ''}>
                    <Link />
                </button>

                <button
                    onClick={orderdList}
                    className={editor?.isActive('orderedList') ? 'is-active' : ''}
                >
                    <ListOrdered />
                </button>

                <button
                    onClick={bulitList}
                    className={editor?.isActive('unOrderedList') ? 'is-active' : ''}
                >
                    <List />
                </button>




            </div>

            <EditorContent placeholder="Enter the text" editor={editor} />


            <Button className=' bg-black hover:bg-[#171717] active:border active:border-dashed hover:border hover:border-dashed' disabled={isPending} onClick={logContent}>Publish</Button>
        </div>
    );
};

export default TextEditor;



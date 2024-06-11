"use client"
import { EditorContent } from '@tiptap/react';
import { Bold, Heading1, Image, Link, List, ListOrdered, Redo2Icon, UnderlineIcon, Undo2Icon } from 'lucide-react';
import { Italic } from 'lucide-react';
import { useEditorConfig } from './useEditorConfig';
import '../app/editor.css'
import { useCallback } from 'react';



const TextEditor = ({ onChange }: { onChange: (markdown: string) => void }) => {



    const editor = useEditorConfig({ onChange })

    const addBold = () => editor && editor.chain().focus().toggleBold().run();
    const addItalic = () => editor && editor.chain().focus().toggleItalic().run();
    const addUnderline = () => editor && editor.chain().focus().toggleUnderline().run();
    const orderdList = () => editor && editor.chain().focus().toggleOrderedList().run()
    const bulitList = () => editor && editor.chain().focus().toggleBulletList().run()
    const addHeading = () => editor && editor?.chain().focus().toggleHeading({ level: 1 }).run()
    const undoCommad = () => editor && editor.chain().focus().undo()
    const redoCommad = () => editor && editor.chain().focus().redo()


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


    const addImage = () => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain()?.focus()?.setImage({ src: url }).run()
        }
    }

    if (!editor) {
        return null
    }
    return (
        <>
            <div className='px-6 bg-[#090909]  flex justify-between ' >
                {/* editor actions  */}
                <div className='text-white bg-[#090909] p-4 flex gap-4 '>
                    <button
                        type='button'
                        onClick={addHeading}><Heading1 /></button>
                    <button
                        type='button'
                        onClick={addBold}>< Bold /></button>
                    <button
                        type='button'
                        onClick={addItalic}><Italic /></button>
                    <button
                        type='button'
                        onClick={addUnderline}><UnderlineIcon /></button>
                    <button
                        type='button'
                        onClick={setLink} className={editor?.isActive('link') ? 'is-active' : ''}><Link /></button>
                    <button 
                        type='button'
                        onClick={orderdList}
                        className={editor?.isActive('orderedList') ? 'is-active' : ''} ><ListOrdered /></button>
                    <button
                        type='button'
                        onClick={bulitList}
                        className={editor?.isActive('unOrderedList') ? 'is-active' : ''}><List /></button>
                    <button
                        type='button'
                        onClick={addImage}><Image /></button>
                </div>
                {/* editor commands  */}
                <div className='text-white bg-[#090909] p-4 flex gap-4 '>
                    <button
                        type='button'
                        onClick={undoCommad}><Undo2Icon /></button>
                    <button
                        type='button'
                        onClick={redoCommad}><Redo2Icon /></button>
                </div>

            </div>



            <EditorContent className='min-h-[40vh] pl-3' editor={editor} />



        </>
    );
};

export default TextEditor;



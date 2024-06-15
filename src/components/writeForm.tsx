'use client'
import React from 'react';
import TextEditor from './tipTap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { usePostArticle } from '@/hooks/usePostArticle';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { editorSchema } from '@/schema/schmea';



const WriteForm = () => {


    const { register, trigger, getValues, setValue, formState: { errors } }
        = useForm<z.infer<typeof editorSchema>>({ resolver: zodResolver(editorSchema) })

    const { mutate, isPending } = usePostArticle()
    const router = useRouter()
    // callback funcation to get markdown contetn form editor 
    const handleEditorChange = (markdown: string) => {
        setValue('content', markdown);
    };

    // client action 
    const onSubmit = async () => {


        const isValid = await trigger();
        if (!isValid) {
            console.log("Form not validated. Validation status -->", isValid);
            toast.error("fill all the fields to publish ")
            return;
        }


        const formValues = getValues()
        if (formValues.title.length < 5) {
            toast.error(" Title  is nessery  ")

        }

        if (formValues.title.length === 5 || formValues.title.length > 5) {

            mutate(JSON.stringify(formValues), {
                onSuccess: () => {
                    router.push('/articles')
                }
            }

            )
        }

    };


    return (
        <div className='w-[80%] md:w-[70%] bg-[#171717] p-[20px] mt-10 '>
            <form action={onSubmit} className="flex gap-4 flex-col justify-center h-auto">
                <div>
                    <input
                        className="bg-[#171717] h-20    px-3 text-[50px] w-full border-none focus-none placeholder:text-[#adb5bd] text-white placeholder:px-2 placeholder:text-[50px]"
                        type="text"
                        {...register("title")}
                        placeholder="ADD TITLE HERE..."
                    />
                    {errors?.title && <p>{errors?.title?.message}</p>}
                </div>
                <TextEditor onChange={handleEditorChange} />

                {isPending ?
                    <Button
                        className='bg-white/5 hover:bg-black/50'
                        disabled={isPending}
                        type='button'
                    >
                        publishing ... <Loader />
                    </Button>
                    :
                    <Button

                        className='bg-black hover:bg-black/50'
                        type="submit">
                        publish
                    </Button>}
            </form>
        </div>
    );
};

export default WriteForm;

'use server'
import { validateRequest } from '../../lib/auth'
import { redirect } from 'next/navigation'
import WriteForm from '@/components/writeForm'
import ImageUploadForm from '@/components/imageUploadForm'


const Write = async () => {
    const { session } = await validateRequest()
    if (!session) {
        return redirect("/")
    }
    return (
        <div className='flex items-center justify-center '>
            <div className='w-[80%] md:w-[70%] bg-[#171717] p-[20px] mt-10 '>
                <ImageUploadForm />
            <WriteForm />
            </div>
        </div>

    )
}

export default Write
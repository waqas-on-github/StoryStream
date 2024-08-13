'use server'
import WriteForm from '@/components/writeForm'
import ImageUploadForm from '@/components/imageUploadForm'
import { CheckAuth } from '@/actions/checkAuth'


const Write = async () => {

    const { session } = await CheckAuth()

    return (
        <div className='flex items-center justify-center'>
            <div className='w-[80%] md:w-[70%] bg-[#171717] p-[20px] mt-10 '>
                <ImageUploadForm />
                <WriteForm />
            </div>
        </div>

    )
}

export default Write
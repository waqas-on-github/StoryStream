import { validateRequest } from '../../lib/auth'
import { redirect } from 'next/navigation'
import WriteForm from '@/components/writeForm'


const Write = async () => {
    const { session } = await validateRequest()
    if (!session) {
        return redirect("/")
    }
    return (
        <div className='flex items-center justify-center '>
            <WriteForm />
        </div>

    )
}

export default Write
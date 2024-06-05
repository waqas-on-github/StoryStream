import React from 'react'
import TextEditor from '../../components/tipTap'
import { validateRequest } from '../../lib/auth'
import { redirect } from 'next/navigation'


const Write = async () => {
    const { session } = await validateRequest()
    if (!session) {
        return redirect("/")
    }
    return (
        <div className=' flex items-center justify-center' >
            <TextEditor />
        </div>
    )
}

export default Write
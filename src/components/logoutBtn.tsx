import React from 'react'
import { Button } from './ui/button'
import { useLogout } from '@/hooks/useLogout'
import { LoaderIcon } from 'lucide-react'

const LogoutBtn = () => {

    const { mutate, isPending } = useLogout()

    return (
        <>
            {
                isPending ? <Button className='w-[100px]' disabled={isPending}> <LoaderIcon /></Button> : <Button className='w-[100px]' onClick={(e) => {

                    mutate()
                }} > Logout</Button>
            }

        </>  
    )
}

export default LogoutBtn
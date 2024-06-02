import React from 'react'
import { Button } from './ui/button'
import { useLogout } from '@/hooks/useLogout'

const LogoutBtn = () => {

    const { mutate, isPending } = useLogout()

    return (
        <Button disabled={isPending} onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            mutate()
        }} > Logout</Button>
    )
}

export default LogoutBtn
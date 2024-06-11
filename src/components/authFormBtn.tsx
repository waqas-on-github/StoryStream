import React from 'react'
import { Button } from './ui/button'
import { LoaderIcon } from 'lucide-react';

const AuthFormBtn = ({ actionType, signinPending }: { actionType: "signin" | "signup"; signinPending: boolean }) => {
    return (

        <>
            {signinPending ? <Button disabled={signinPending} className="w-full" type="submit">
                <LoaderIcon />
            </Button> : 
        <Button className="w-full" type="submit">
            {actionType}
        </Button>
            }
        </>
    )
}

export default AuthFormBtn
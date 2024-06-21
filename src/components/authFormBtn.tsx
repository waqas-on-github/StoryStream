import React from 'react'
import { Button } from './ui/button'
import { LoaderIcon } from 'lucide-react';

const AuthFormBtn = ({ actionType, signinPending, signUpPending }: { actionType: "signin" | "signup"; signinPending: boolean, signUpPending: boolean }) => {
    return (

        <>
            {signinPending || signUpPending ? <Button disabled={signinPending} className="w-full" type="submit">
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
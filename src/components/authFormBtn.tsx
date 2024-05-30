import React from 'react'
import { Button } from './ui/button'

const AuthFormBtn = ({ actionType }: { actionType: string }) => {
    return (
        <Button className="w-full" type="submit">
            {actionType}
        </Button>
    )
}

export default AuthFormBtn
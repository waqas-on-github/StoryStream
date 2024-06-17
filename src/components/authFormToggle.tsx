import { authType } from '@/types/authType'
import React from 'react'
import ActiveLink from './activeLink'

const AuthFormToggle = ({ actionType, href }: authType) => {
    return (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            {actionType.includes('up') ? "Already have an account?" : "Dont have account?"}
            <ActiveLink
                className="font-medium underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
                href={actionType.includes("up") && href?.includes('up') ? "#signup" : "#signin"}
            >
                {actionType.includes('up') ? 'sign in' : 'sign up'}
            </ActiveLink>
        </div>
    )
}

export default AuthFormToggle
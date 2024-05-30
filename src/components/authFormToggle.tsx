import Link from 'next/link'
import React from 'react'

const AuthFormToggle = ({ actionType, href }: { actionType: string, href: string }) => {
    return (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            {actionType.includes('up') ? "Already have an account?" : "Dont have account?"}
            <Link
                className="font-medium underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
                href={actionType.includes("up") && href?.includes('up') ? "#signup" : "#signin"}
            >
                {actionType.includes('up') ? 'sign in' : 'sign up'}
            </Link>
        </div>
    )
}

export default AuthFormToggle
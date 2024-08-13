"use server"
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogContent, Dialog } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import AuthForm from "./auth.Form"
import { authType } from "@/types/authType"
import Link from "next/link"

export async function Model({ actionType, className, href }: authType) {

  return (
      <Dialog >

      <DialogTrigger asChild>
        <Link href={`${href || "#"}`} className={cn("text-base font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50", className)}  >
            {actionType.includes("up") ? <Button className="text-base rounded-full md:p-4 md:px-6" >Get started</Button> : actionType}
        </Link>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] w-full">

        <div className="flex items-center justify-between">
          <DialogTitle>{actionType.includes("up") ? "Sign up" : actionType}</DialogTitle>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {href && <AuthForm href={href} actionType={actionType} />}            
        </div>

      </DialogContent>
    </Dialog >
  )
}


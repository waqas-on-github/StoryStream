"use server"
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogContent, Dialog } from "@/components/ui/dialog"
import Link from "next/link"
import { cn } from "@/lib/utils"
import AuthForm from "./authForm"
import AuthFormToggle from "./authFormToggle"

export async function Model({ actionType, className, href }:
  { actionType: string; className?: string, href?: string }) {

  return (
    <Dialog >

      <DialogTrigger asChild>
        <Link href={`${href || "#"}`} className={cn("text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50", className)}  >
          {actionType.includes("up") ? <Button>Get started</Button> : actionType}
        </Link>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] w-full">
        <div className="flex items-center justify-between">
          <DialogTitle>{actionType.includes("up") ? "Sign up" : actionType}</DialogTitle>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <AuthForm actionType={actionType} />
        </div>


      </DialogContent>
    </Dialog >
  )
}


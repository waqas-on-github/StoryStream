"use server"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { childrenType } from "@/types/commonTypes"
import { Model } from "./model"
import { validateRequest } from "@/lib/auth"
import AuthWrapper from "./authWrapper"
import ActiveLink from "./activeLink"
import Link from "next/link"


export async function Navbar({ children }: childrenType) {

  // validating user and get user id 
  const { user } = await validateRequest()


  return (
    <>
      <header className="flex   bg-[#E4E7EB] h-16 w-full items-center justify-between px-4 md:px-12 border-b ">
        <Link className="flex items-center gap-2" href="/">
          <MountainIcon className="h-6 w-6" />
        </Link>
        <nav className="hidden md:flex items-center gap-5">
          {user && user.id && <ActiveLink href='/write'>Write</ActiveLink>}
          <ActiveLink className='' href="/articles">
            Articles
          </ActiveLink >
          {/* // if user is authancated   */}
          {user && user.id ? <AuthWrapper userId={user.id} /> :
            <>

              <Model actionType="signin" href="#" />
              <Model actionType="signup" href="#" />
            </>
          }
        </nav>

        <Sheet >
          <SheetTrigger asChild>
            <Button className="rounded-full md:hidden" >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] p-6 md:hidden" >
            <div className="flex flex-col gap-4">
              {user && user.id && <ActiveLink className='' href='/write'>Write</ActiveLink>}


              <ActiveLink className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50" href="articles">
                Articles
              </ActiveLink>

              {user && user.id ? <AuthWrapper userId={user.id} /> :
                <>
                  <Model actionType="signin" href="#" />
                  <Model actionType="signup" href="#" />
                </>
              }
            </div>
          </SheetContent>
        </Sheet>

      </header>
      {children}  
    </>
  )
}

function MenuIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MountainIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

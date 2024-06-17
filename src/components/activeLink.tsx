'use client'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function ActiveLink({ className, children, href }: { className?: string; children: React.ReactNode; href: string }) {

  const pathname = usePathname()


  return (
    <Link
      href={href}
      className={
        cn(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50",
          pathname === href
            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
            : "hover:text-gray-900 dark:hover:text-gray-50", className
        )
      }
      prefetch={false}
    >
      {children}
    </Link>
  )
}
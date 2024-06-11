"use client"
import { childrenType } from "@/types/commonTypes"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"



const QueryProvider = ({ children }: childrenType) => {
    const queryClient = new QueryClient()
    return (
        <>
            <QueryClientProvider client={queryClient} >
                {children}
            </QueryClientProvider>
        </>
    )
}

export default QueryProvider
'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { Search, Trash } from "lucide-react";




const SearchBox = () => {

    const [search, setsearch] = useState<string>('')
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();




    const handleSearch = (term: string) => {

        const termsShema = z.string().trim()
        const isvaildTerm = termsShema.safeParse(term)

        if (isvaildTerm.error || !isvaildTerm.data || !isvaildTerm.success) {
            toast.error("only string allowed ")
        }


        const params = new URLSearchParams(searchParams);


        if (isvaildTerm && isvaildTerm.data) {
            params.set('query', isvaildTerm?.data);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleRemoveSearch = () => {

        const params = new URLSearchParams(searchParams);
        params.set('query', '')
        params.delete('query');
        setsearch('')
        replace(`${pathname}?${params.toString()}`);


    }

    return (
        <>
            <div className="flex gap-4" >
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="flex items-center justify-center  border-[1px] border-black/30 rounded px-3   " >

                <Input
                    placeholder="search...."
                    onChange={(e) => {
                        setsearch(e?.target?.value);
                    }}
                    value={search}
                        className="focus:outline-none focus:border-none  outline-none border-none placeholder:text-[15px]"
                    />

                    <Trash
                        className="text-black/80 hover:text-black transition focus:text-black"
                        size={15}
                        onClick={() => handleRemoveSearch()} />

                </div>
                <Button onClick={() => handleSearch(search)} > <Search /></Button>

            </div>

        </>
    )
}

export default SearchBox
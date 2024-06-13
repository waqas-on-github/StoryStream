'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { Delete, RemoveFormatting, Search } from "lucide-react";




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
            <div className="flex" >
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <Input
                    placeholder="search...."
                    onChange={(e) => {
                        setsearch(e?.target?.value);
                    }}
                    value={search}
                />
                <Button onClick={() => handleRemoveSearch()} > <Delete />   </Button>
                <Button onClick={() => handleSearch(search)} > <Search /></Button>

            </div>

        </>
    )
}

export default SearchBox
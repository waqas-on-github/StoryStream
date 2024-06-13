'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";

const PaginationControls = () => {


    const [pageNumber, setPageNumber] = useState<number>(1)
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();




    const setPervPage = () => {

        if (pageNumber <= 1) {
            setPageNumber(1)
        } else {
            setPageNumber((prev) => prev - 1)
        }

        const params = new URLSearchParams(searchParams);
        if (pageNumber) {
            params.set('page', String(pageNumber));
        } else {
            params.delete('page');
        }
        replace(`${pathname}?${params.toString()}`);
    }


    const setNextPage = () => {

        console.log("next  clicked ");
        console.log(pageNumber, "prev");

        setPageNumber((prev) => prev + 1)

        const params = new URLSearchParams(searchParams);
        if (pageNumber) {
            params.set('page', String(pageNumber));
        } else {
            params.delete('page');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>

            <Button onClick={setPervPage} >prev</Button>
            <Button onClick={setNextPage} >next</Button>


        </div>
    )
}

export default PaginationControls
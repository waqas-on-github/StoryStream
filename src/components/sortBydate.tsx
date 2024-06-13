
'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"




const SortBydate = () => {

    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();




    const handleSort = (term: string) => {

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('date', term);
        } else {
            params.delete('date');
        }
        replace(`${pathname}?${params.toString()}`);

    };

    const handleRemoveSearch = () => {

        const params = new URLSearchParams(searchParams);
        params.set('date', '')
        params.delete('date');
        replace(`${pathname}?${params.toString()}`);


    }

    return (
        <>

            <select name="date" onChange={(e) => handleSort(e.target.value)} >
                <option value='' > date </option>
                <option value="desc">new</option>
                <option value="asc">old</option>

            </select>


        </>
    )
}

export default SortBydate
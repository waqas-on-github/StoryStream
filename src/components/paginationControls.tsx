'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PaginationControls = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();


    const handlePaginate = (term: string) => {

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('page', term);
        } else {
            params.delete('page');
        }
        replace(`${pathname}?${params.toString()}`);

    };

    return (
        <div>PaginationControls</div>
    )
}

export default PaginationControls
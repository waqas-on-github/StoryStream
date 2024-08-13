import { CheckAuth } from '@/actions/checkAuth'
import SearchBox from '@/components/searchBox'
import RenderMdToHtml from '@/components/renderMdToHtml'
import SortBydate from '@/components/sortBydate'
import PaginationControls from '@/components/paginationControls'


const page = async ({ searchParams }: { searchParams: { query: string, date: 'asc' | 'desc', page: string } }) => {
    const { user } = await CheckAuth()
    console.log("this is server component ");

    return (
        <div className=' flex items-center justify-center flex-col'>


            <div className='flex p-10 gap-5'>
                <SearchBox />
                <SortBydate />
            </div>

            <div className='p-10 flex gap-10 flex-wrap items-center justify-center'>
                <RenderMdToHtml searchParams={searchParams} />
            </div>


            <PaginationControls />
        </div>
    )
}

export default page



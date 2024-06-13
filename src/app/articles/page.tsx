import { CheckAuth } from '@/actions/checkAuth'
import SearchBox from '@/components/searchBox'
import RenderMdToHtml from '@/components/renderMdToHtml'
import SortBydate from '@/components/sortBydate'
import PaginationControls from '@/components/paginationControls'
import { sleep } from '@/lib/utils'


const page = async ({ searchParams }: { searchParams: { query: string, date: 'asc' | 'desc', page: string } }) => {
    const { user } = await CheckAuth()
    await sleep(3000)

    return (
        <div className=' flex items-center justify-center flex-col'>
            <div className='flex '>
                <SearchBox />
                <SortBydate />
            </div>

            <div className='flex items-center justify-center'>
                <RenderMdToHtml user={user.id} searchParams={searchParams} />
            </div>

            <PaginationControls />
        </div>
    )
}

export default page



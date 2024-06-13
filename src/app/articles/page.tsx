import { CheckAuth } from '@/actions/checkAuth'
import SearchBox from '@/components/searchBox'
import RenderMdToHtml from '@/components/renderMdToHtml'
import SortBydate from '@/components/sortBydate'


const page = async ({ searchParams }: { searchParams: { query: string, date: string } }) => {
    const { user } = await CheckAuth()
    return (
        <div className=' flex items-center justify-center flex-col'>
            <div className='flex '>
                <SearchBox />
                <SortBydate />
            </div>

            <div className='flex items-center justify-center'>

                <RenderMdToHtml user={user.id} searchParams={searchParams} />
            </div>


        </div>
    )
}

export default page



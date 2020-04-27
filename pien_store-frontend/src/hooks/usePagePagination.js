import { useEffect } from 'react'

export default function usePagePagination() {
    const handlePaginate = async (pageIndex, filterData = null) => {
        console.log(pageIndex, ' - ', filterData)
    }
    return {};
}

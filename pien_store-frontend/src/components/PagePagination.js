import React from 'react'
import { useSelector } from 'react-redux'
import { usePagePagination } from '../hooks/HookManager'

export default function PagePagination(props) {
    const {pagePaginationInfo} = useSelector(state => ({
        pagePaginationInfo: state.common.pagePagination
    }))

    const nextPageUrl = pagePaginationInfo.next_page_url
    const prevPageUrl = pagePaginationInfo.prev_page_url
    const total = pagePaginationInfo.total
    const perPage = pagePaginationInfo.per_page
    const curPage = pagePaginationInfo.current_page

    let pageNumbers = Math.ceil(total/perPage)
    pageNumbers = Array.from({length:pageNumbers},(v,k)=>k+1)
    console.log(pageNumbers)
    const getPageNumber = (url) => {
        let x = url.split('=')
        return x[x.length - 1]
    }

    return (
        <>
            {props.isShow === 'true' && pageNumbers && pagePaginationInfo &&
            <div className="row">
                <div className="col-sm-12">
                    <div className="pagination font-alt">
                        <button type="button" onClick={() => props.handlePaginate(getPageNumber(prevPageUrl))} disabled={!prevPageUrl}><i className="fa fa-angle-left"></i></button>
                        {
                            pageNumbers.map(number =>
                                <button className={curPage === number ? 'active' : ''} key={number} onClick={() => props.handlePaginate(number)}>{number}</button>
                            )
                        }
                        <button type="button" onClick={() => props.handlePaginate(getPageNumber(nextPageUrl))} disabled={!nextPageUrl}><i className="fa fa-angle-right"></i></button>
                    </div>
                </div>
            </div>}
        </>
    )
}

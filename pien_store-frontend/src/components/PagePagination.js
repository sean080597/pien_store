import React from 'react'
import { useSelector } from 'react-redux'
import { usePagePagination } from '../hooks/HookManager'

export default function PagePagination(props) {
    const {nextPageUrl, prevPageUrl, total, perPage, curPage} = useSelector(state => ({
        nextPageUrl: state.shop.pagePagination.next_page_url,
        prevPageUrl: state.shop.pagePagination.prev_page_url,
        total: state.shop.pagePagination.total,
        perPage: state.shop.pagePagination.per_page,
        curPage: state.shop.pagePagination.current_page
    }))

    let pageNumbers = Math.ceil(total/perPage)
    pageNumbers = Array.from({length:pageNumbers},(v,k)=>k+1)

    const getPageNumber = (url) => {
        let x = url.split('=')
        return x[x.length - 1]
    }

    return (
        <>
            {props.isShow === 'true' && pageNumbers &&
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

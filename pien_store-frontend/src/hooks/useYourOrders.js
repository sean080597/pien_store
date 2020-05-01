import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import ConnectionService from '../services/ConnectionService.service';

const apiUrl = CommonConstants.API_URL;

export default function useYourOrders() {
    const dispatch = useDispatch()
    const defaultPageSize = 3
    const {cusInfo, recentOrders} = useSelector(state => ({
        cusInfo: state.auth.user,
        recentOrders: state.yourOrders.lsRecentOrders
    }))
    // handle
    const handlePaginate = async (pageIndex) => {
        await applyGetYourOrders(pageIndex, defaultPageSize)
        CommonService.goToPosition('#order-section')
    }

    // apply
    const applyGetYourOrders = (pageIndex = null, pagination) => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        let apiQuery = `${apiUrl}/order/getPaginatedYourOrders/${cusId}/${pagination}${pageIndex ? '?page=' + pageIndex : ''}`
        ConnectionService.axiosGetByUrlWithToken(apiQuery)
        .then(async res => {
            let recentOrders = res.data.data
            // delete recent orders list to take all pagination info
            delete res.data.data
            await dispatch({type: 'SET_RECENT_ORDERS', payload: recentOrders})
            await dispatch({type: 'SET_PAGINATION', payload: res.data})
            CommonService.turnOffLoader()
        })
    }

    useEffect(() => {
        if(!CommonService.isObjectEmpty(cusInfo)) applyGetYourOrders(null, defaultPageSize)
        return () => {}
    }, [cusInfo])
    return {handlePaginate};
}

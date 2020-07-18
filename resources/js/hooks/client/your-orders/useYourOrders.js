import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../../../config/CommonConstants'
import {useConnectionService, useCommonService} from '../../HookManager'

const apiUrl = CommonConstants.API_URL;

export default function useYourOrders() {
    const CommonService = useCommonService()
    const ConnectionService = useConnectionService()
    const dispatch = useDispatch()
    const defaultPageSize = 5
    const {cusInfo} = useSelector(state => ({
        cusInfo: state.auth.user
    }))
    // handle
    const handlePaginate = async (pageIndex) => {
        await applyGetYourOrders(pageIndex, defaultPageSize)
        CommonService.goToPosition('#order-section')
    }

    // apply
    const applyGetYourOrders = async (pageIndex = null, pagination) => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        const sendData = {
            pageSize: pagination
        }
        const apiQuery = `${apiUrl}/order/searchData/${cusId}${pageIndex ? '?page=' + pageIndex : ''}`
        CommonService.turnOnLoader()
        await ConnectionService.axiosPostByUrlWithToken(apiQuery, sendData)
        .then(res => {
            let recentOrders = res.data.data
            // delete recent orders list to take all pagination info
            delete res.data.data
            dispatch({type: 'SET_RECENT_ORDERS', payload: recentOrders})
            dispatch({type: 'SET_PAGINATION', payload: res.data})
        })
        CommonService.turnOffLoader()
    }

    useEffect(() => {
        if(!CommonService.isObjectEmpty(cusInfo)) applyGetYourOrders(null, defaultPageSize)
        return () => {}
    }, [cusInfo])
    return {handlePaginate};
}

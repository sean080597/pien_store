import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import ConnectionService from '../services/ConnectionService.service';
import {useHistory} from 'react-router-dom'

const apiUrl = CommonConstants.API_URL;

export default function useYourOrders() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {cusInfo, recentOrders} = useSelector(state => ({
        cusInfo: state.auth.user,
        recentOrders: state.yourOrders.lsRecentOrders
    }))
    // handle
    const handlePaginate = async (pageIndex) => {
        await applyGetAllYourOrders(pageIndex)
        CommonService.goToPosition('#order-section')
    }

    // apply
    const applyGetAllYourOrders = (pageIndex, pagination = null) => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        let apiQuery = `${apiUrl}/order/getPaginatedYourOrders/${cusId}${pagination ? '/' + pagination : ''}${pageIndex ? '?page=' + pageIndex : ''}`
        ConnectionService.axiosGetByUrlWithToken(apiQuery)
        .then(async res => {
            await dispatch({type: 'SET_RECENT_ORDERS', payload: res})
            CommonService.turnOffLoader()
        })
    }

    useEffect(() => {
        if(!CommonService.isObjectEmpty(cusInfo)) applyGetAllYourOrders()
        return () => {}
    }, [cusInfo])
    return {handlePaginate};
}

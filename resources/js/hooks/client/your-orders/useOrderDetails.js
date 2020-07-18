import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CommonConstants from '../../../config/CommonConstants'
import {useConnectionService, useCommonService} from '../../HookManager'

const apiUrl = CommonConstants.API_URL;

export default function useOrderDetails(order_id) {
    const CommonService = useCommonService()
    const ConnectionService = useConnectionService()
    const dispatch = useDispatch()
    const [orderDetailsInfo, setOrderDetailsInfo] = useState({})

    // handle
    const applyGetOrderDetails = async () => {
        const apiQuery = `${apiUrl}/order/getSingleData/${order_id}`
        CommonService.turnOnLoader()
        await ConnectionService.axiosGetByUrlWithToken(apiQuery)
        .then(res => {
            setOrderDetailsInfo(res.data)
        })
        CommonService.turnOffLoader()
    }

    useEffect(()=>{
        applyGetOrderDetails()
        return () => {}
    }, [])

    return {orderDetailsInfo};
}
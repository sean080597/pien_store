import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CommonConstants from '../../../config/CommonConstants'
import CommonService from '../../../services/CommonService.service'
import ConnectionService from '../../../services/ConnectionService.service';

const apiUrl = CommonConstants.API_URL;

export default function useOrderDetails(order_id) {
    const dispatch = useDispatch()
    const [orderDetailsInfo, setOrderDetailsInfo] = useState({})

    // handle
    const applyGetOrderDetails = () => {
        const apiQuery = `${apiUrl}/order/getSingleData/${order_id}`
        ConnectionService.axiosGetByUrlWithToken(apiQuery)
        .then(async res => {
            await setOrderDetailsInfo(res.data)
            CommonService.turnOffLoader()
        })
    }

    useEffect(()=>{
        applyGetOrderDetails()
        return () => {}
    }, [])

    return {orderDetailsInfo};
}
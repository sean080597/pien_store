import {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import {trackPromise} from 'react-promise-tracker'
import Cookie from 'js-cookie'
import axios from 'axios'
import iziToast from 'izitoast'
import CommonService from '../services/CommonService.service'

const apiUrl = CommonConstants.API_URL;
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Cookie.get('access_token')}`
}

export default function useCheckout(initial, modalRef) {
    const dispatch = useDispatch()
    const {cusProfile, cusInfo} = useSelector(state => ({
        cusProfile: state.auth.profile,
        cusInfo: state.auth.user
    }))

    const [userInputs, setUserInputs] = useState(initial)

    //handle
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserInputs({...userInputs, [name]: value})
    }

    const handleSubmitInfo = async (evt) => {
        evt.preventDefault();
        
    }

    //apply
    const applyGetUserProfile = async () => {
        trackPromise(
            axios.post(`${apiUrl}/user/me`, null, { headers: headers })
            .then(async res => {
                await dispatch({type: 'SET_USER_PROFILE', payload: res.data})
            }).catch(error => {
                throw (error);
            })
        )
    }

    const applyGetOrderAddresses = async () => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        trackPromise(
            axios.get(`${apiUrl}/customer/getOrderAddresses/${cusId}`, { headers: headers })
            .then(async res => {
                if(res.data.success)
                    console.log(res.data)
                    await dispatch({type: 'SET_ORDER_ADDRESSES', payload: res.data.data})
            }).catch(error => {
                throw (error);
            })
        )
    }

    // const applyStartupCheckout = async () => {
    //     await applyGetUserProfile()
    //     applyGetOrderAddresses()
    // }

    useEffect(() => {
        if(CommonService.isObjectEmpty(cusProfile)) applyGetUserProfile()
        if(!CommonService.isObjectEmpty(cusInfo)) applyGetOrderAddresses()
        return () => {}
    }, [cusInfo])
    return {userInputs, handleChange, handleSubmitInfo};
}

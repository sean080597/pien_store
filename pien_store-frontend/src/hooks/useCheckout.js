import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import {trackPromise} from 'react-promise-tracker'
import Cookie from 'js-cookie'
import axios from 'axios'
import _ from 'lodash'
import iziToast from 'izitoast'

const apiUrl = CommonConstants.API_URL;
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Cookie.get('access_token')}`
}

export default function useCheckout(initial, modalRef) {
    const dispatch = useDispatch()
    const {cusInfo, orderAddresses, cloneOrderAddresses} = useSelector(state => ({
        cusInfo: state.auth.user,
        orderAddresses: state.checkout.orderAddresses,
        cloneOrderAddresses: state.checkout.cloneOrderAddresses
    }))

    const [userInputs, setUserInputs] = useState(initial)

    //handle
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserInputs({...userInputs, [name]: value})
    }

    const handleSwitchAddress = (evt) => {
        const temp = _.cloneDeep(orderAddresses)
        temp.map((addr, index) => {
            addr.isChecked = (parseInt(evt.target.value) === index) ? true : false
        })
        dispatch({type: 'SET_ORDER_ADDRESSES', payload: temp})
    }

    const handleChangedAddress = () => {
        orderAddresses.forEach(addr => {
            if(addr.isChecked){
                dispatch({type: 'SET_SELECTED_ADDRESS', payload: addr})
                return
            }
        });
        modalRef.current.closeModal()
    }

    const handleCancelChangedAddress = () => {
        dispatch({type: 'SET_ORDER_ADDRESSES', payload: cloneOrderAddresses})
        modalRef.current.closeModal()
    }

    const handleConfirmOrder = () => {
        iziToast.show({
            theme: 'dark',
            icon: 'fa fa-check-circle',
            title: 'Thanks for ordering!',
            position: 'topRight'
        })
    }

    //apply
    const applyGetOrderAddresses = async () => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        trackPromise(
            axios.get(`${apiUrl}/customer/getOrderAddresses/${cusId}`, { headers: headers })
            .then(res => {
                if(res.data.success)
                    dispatch({type: 'SET_ORDER_ADDRESSES', payload: res.data.data})
                    dispatch({type: 'SET_CLONE_ORDER_ADDRESSES', payload: res.data.data})
                    dispatch({type: 'SET_SELECTED_ADDRESS', payload: res.data.data[0]})
            }).catch(error => {
                throw (error);
            })
        )
    }

    useEffect(() => {
        if(!CommonService.isObjectEmpty(cusInfo)) applyGetOrderAddresses()
        return () => {}
    }, [cusInfo])
    return {userInputs, handleChange, handleSwitchAddress, handleChangedAddress, handleCancelChangedAddress, handleConfirmOrder};
}

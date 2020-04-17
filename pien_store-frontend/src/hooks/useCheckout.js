import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import {trackPromise} from 'react-promise-tracker'
import Cookie from 'js-cookie'
import axios from 'axios'
import _ from 'lodash'
import iziToast from 'izitoast'
import {useHistory} from 'react-router-dom'

const apiUrl = CommonConstants.API_URL;

export default function useCheckout(initial, modalRef) {
    const dispatch = useDispatch()
    const history = useHistory()
    const {headers, cusInfo, orderAddresses, cloneOrderAddresses, selectedAddress, cartItems} = useSelector(state => ({
        cusInfo: state.auth.user,
        orderAddresses: state.checkout.orderAddresses,
        cloneOrderAddresses: state.checkout.cloneOrderAddresses,
        selectedAddress: state.checkout.selectedAddress,
        cartItems: state.shop.cartItems,
        headers: state.common.apiHeaders
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
        dispatch({type: 'SET_CLONE_ORDER_ADDRESSES', payload: orderAddresses})
        modalRef.current.closeModal()
    }

    const handleCancelChangedAddress = () => {
        dispatch({type: 'SET_ORDER_ADDRESSES', payload: cloneOrderAddresses})
        modalRef.current.closeModal()
    }

    const handleConfirmOrder = () => {
        if(CommonService.isAnyPropertyOfObjectEmpty(selectedAddress, ['midname'])){
            iziToast.error({
                theme: 'dark',
                title: CommonConstants.NOTIFY.CHECKOUT.MISSING_INFO,
                position: 'topCenter'
            })
        }else{
            const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
            const items = cartItems.map(item => { return { prod_id: item.id, quantity: item.quantity } })
            //delete fullname and isChecked before confirm order info
            delete selectedAddress['fullname']
            delete selectedAddress['isChecked']
            const sendData = {
                'cus_id': cusId,
                'cart_items': items,
                'shipment_details': selectedAddress
            }

            trackPromise(
                axios.post(`${apiUrl}/order/confirmOrderInfo`, sendData, { headers: headers })
                .then(async res => {
                    if(res.data.success){
                        localStorage.removeItem(CommonConstants.LOCALSTORAGE_NAME)
                        dispatch({type: 'SET_CART_ITEMS', payload: []})
                        dispatch({type: 'SET_CART_COUNT', payload: 0})
                        dispatch({type: 'SET_CART_TOTAL', payload: 0})
                        iziToast.success({
                            title: CommonConstants.NOTIFY.CHECKOUT.ORDER_SUCCESS,
                            position: 'topCenter'
                        })
                        history.push("/shop");
                    }
                }).catch(error => {
                    throw (error);
                })
            )
        }
    }

    //apply
    const applyGetOrderAddresses = async () => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        trackPromise(
            axios.get(`${apiUrl}/customer/getOrderAddresses/${cusId}`, { headers: headers })
            .then(res => {
                if(res.data.success){
                    dispatch({type: 'SET_ORDER_ADDRESSES', payload: res.data.data})
                    dispatch({type: 'SET_CLONE_ORDER_ADDRESSES', payload: res.data.data})
                    dispatch({type: 'SET_SELECTED_ADDRESS', payload: res.data.data[0]})
                }
            }).catch(error => {
                throw (error);
            })
        )
    }

    useEffect(() => {
        if(cartItems.length < 1) history.push('/shop')
        else if(!CommonService.isObjectEmpty(cusInfo)) applyGetOrderAddresses()
        return () => {}
    }, [cusInfo, headers])
    return {userInputs, handleChange, handleSwitchAddress, handleChangedAddress, handleCancelChangedAddress, handleConfirmOrder};
}

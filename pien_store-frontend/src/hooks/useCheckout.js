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

    const handleShowAddNewAddress = (isShow) => {
        // reset userInputs & turn off show add new shipment details
        applySetUserInputs({}, isShow)
        // set all editable shipmentDetails to false
        orderAddresses.map((addr) => { return addr.isEditable = false })
    }

    const handleAddNewAddress = () => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        const sendData = _.cloneDeep(userInputs)
        delete sendData['isShowAddNewAddress']
        trackPromise(
            axios.post(`${apiUrl}/customer/createShipmentDetail/${cusId}`, sendData, { headers: headers })
            .then(res => {
                if(res.data.success){
                    orderAddresses.push(res.data.data)
                    applySetStateOrderAddresses(orderAddresses)
                }
            }).catch(error => {
                throw (error);
            })
        )
    }

    const handleDeleteShipmentDetails = (delete_id) => {
        iziToast.question({
            timeout: false,
            overlay: true,
            displayMode: 'once',
            title: 'Delete',
            message: 'Are you sure want to delete?',
            position: 'center',
            buttons: [
                ['<button><b>YES</b></button>', function (instance, toast) {
                    applyDeleteShipmentDetail(delete_id)
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }, true],
                ['<button>NO</button>', function (instance, toast) {
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }],
            ]
        });
    }

    const handleSetEditableShipment = (shipmentDetail, editable) => {
        // set userInputs
        applySetUserInputs(editable ? shipmentDetail : {}, false)
        // change orderAddresses
        orderAddresses.map((addr) => {
            if(editable) return addr.isEditable = addr.id === shipmentDetail.id ? true : false
            else return addr.isEditable = false
        })
        // set state
        applySetStateOrderAddresses(orderAddresses)
    }

    const handleEditShipmentDetail = (shipmentDetail) => {
        shipmentDetail.firstname = userInputs.firstname
        shipmentDetail.lastname = userInputs.lastname
        shipmentDetail.address = userInputs.address
        shipmentDetail.phone = userInputs.phone
        // call to update shipment details
        applyEditShipmentDetails(shipmentDetail)
    }

    //apply
    const applyGetOrderAddresses = async () => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        trackPromise(
            axios.get(`${apiUrl}/customer/getOrderAddresses/${cusId}`, { headers: headers })
            .then(res => {
                if(res.data.success){
                    if(res.data.data.length > 0){
                        applySetStateOrderAddresses(res.data.data)
                        dispatch({type: 'SET_SELECTED_ADDRESS', payload: res.data.data[0]})
                    }
                }
            }).catch(error => {
                throw (error);
            })
        )
    }

    const applyDeleteShipmentDetail = (delete_id) => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        trackPromise(
            axios.delete(`${apiUrl}/customer/deleteShipmentDetail/${cusId}/${delete_id}`, { headers: headers })
            .then(async res => {
                if(res.data.success){
                    _.remove(orderAddresses, (item) => {
                        return item.id === delete_id
                    })
                    if(selectedAddress.id === delete_id){
                        await dispatch({type: 'SET_SELECTED_ADDRESS', payload: orderAddresses[0]})
                        selectedAddress.isChecked = true
                    }
                    dispatch({type: 'SET_ORDER_ADDRESSES', payload: orderAddresses})
                    dispatch({type: 'SET_CLONE_ORDER_ADDRESSES', payload: orderAddresses})
                    iziToast.success({
                        title: CommonConstants.NOTIFY.CHECKOUT.DELETE_SHIPMENT_SUCCESS,
                        position: 'topCenter'
                    })
                }
            }).catch(error => {
                throw (error);
            })
        )
    }

    const applySetStateOrderAddresses = (data) => {
        dispatch({type: 'SET_ORDER_ADDRESSES', payload: data})
        dispatch({type: 'SET_CLONE_ORDER_ADDRESSES', payload: data})
    }

    const applySetUserInputs = (data, isShowAddNewAddress) => {
        setUserInputs({...userInputs,
            firstname: data.firstname ? data.firstname : '',
            lastname: data.lastname ? data.lastname : '',
            phone: data.phone ? data.phone : '',
            address: data.address ? data.address : '',
            isShowAddNewAddress: isShowAddNewAddress
        })
    }

    const applyEditShipmentDetails = (shipmentDetail) => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        trackPromise(
            axios.put(`${apiUrl}/customer/editShipmentDetail/${cusId}`, shipmentDetail, { headers: headers })
            .then(async res => {
                if(res.data.success){
                    orderAddresses.map((item) => { return item.isEditable = false })
                    applySetStateOrderAddresses(orderAddresses)
                    iziToast.success({
                        title: CommonConstants.NOTIFY.CHECKOUT.EDITED_SHIPMENT_SUCCESS,
                        position: 'topCenter'
                    })
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
    return {userInputs, handleChange, handleSwitchAddress, handleChangedAddress, handleCancelChangedAddress,
        handleAddNewAddress, handleConfirmOrder, handleShowAddNewAddress, handleDeleteShipmentDetails,
        handleSetEditableShipment, handleEditShipmentDetail};
}

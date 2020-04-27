import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import ConnectionService from '../services/ConnectionService.service'
import _ from 'lodash'
import iziToast from 'izitoast'
import {useHistory} from 'react-router-dom'

const apiUrl = CommonConstants.API_URL;

export default function useCheckout(initial, modalRef) {
    const dispatch = useDispatch()
    const history = useHistory()
    const {cusInfo, orderAddresses, cloneOrderAddresses, selectedAddress, cartItems} = useSelector(state => ({
        cusInfo: state.auth.user,
        orderAddresses: state.checkout.orderAddresses,
        cloneOrderAddresses: state.checkout.cloneOrderAddresses,
        selectedAddress: state.checkout.selectedAddress,
        cartItems: state.shop.cartItems
    }))

    const [userInputs, setUserInputs] = useState(initial)

    //handle
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserInputs({...userInputs, [name]: value})
    }

    const handleClearState = () => {
        setUserInputs({ ...initial });
      };

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
            const apiQuery = `${apiUrl}/order/confirmOrderInfo`
            const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
            const items = cartItems.map(item => { return { prod_id: item.id, quantity: item.quantity } })
            //delete fullname and isChecked before confirm order info
            delete selectedAddress['fullname']
            delete selectedAddress['isChecked']
            delete selectedAddress['isEditable']
            delete selectedAddress['gender']
            const sendData = {
                'cus_id': cusId,
                'cart_items': items,
                'shipment_details': selectedAddress
            }

            ConnectionService.axiosPostByUrlWithToken(apiQuery, sendData)
            .then(async res => {
                if(res.success){
                    localStorage.removeItem(CommonConstants.LOCALSTORAGE_NAME)
                    dispatch({type: 'SET_CART_ITEMS', payload: []})
                    dispatch({type: 'SET_CART_COUNT', payload: 0})
                    dispatch({type: 'SET_CART_TOTAL', payload: 0})
                    CommonService.turnOffLoader()
                    iziToast.success({
                        title: CommonConstants.NOTIFY.CHECKOUT.ORDER_SUCCESS,
                        position: 'topCenter'
                    })
                    history.push("/shop");
                }
            })
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
        const apiQuery = `${apiUrl}/customer/createShipmentDetail/${cusId}`
        const sendData = _.cloneDeep(userInputs)
        delete sendData['isShowAddNewAddress']
        ConnectionService.axiosPostByUrlWithToken(apiQuery, sendData)
        .then(async res => {
            if(res.success){
                orderAddresses.push(res.data)
                await applySetStateOrderAddresses(orderAddresses)
                // empty userInputs after adding new address
                handleClearState()
                CommonService.turnOffLoader()
            }
        })
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
        const apiQuery = `${apiUrl}/customer/getOrderAddresses/${cusId}`
        ConnectionService.axiosGetByUrlWithToken(apiQuery)
        .then(async res => {
            if(res.success){
                if(res.data.length > 0){
                    await applySetStateOrderAddresses(res.data)
                    await dispatch({type: 'SET_SELECTED_ADDRESS', payload: res.data[0]})
                    CommonService.turnOffLoader()
                }
            }
        })
    }

    const applyDeleteShipmentDetail = (delete_id) => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        const apiQuery = `${apiUrl}/customer/deleteShipmentDetail/${cusId}/${delete_id}`
        ConnectionService.axiosDeleteByUrlWithToken(apiQuery)
        .then(async res => {
            if(res.success){
                _.remove(orderAddresses, (item) => {
                    return item.id === delete_id
                })
                if(selectedAddress.id === delete_id){
                    orderAddresses[0].isChecked = true
                    await dispatch({type: 'SET_SELECTED_ADDRESS', payload: orderAddresses[0]})
                }
                // set orderAddresses
                await applySetStateOrderAddresses(orderAddresses)
                CommonService.turnOffLoader()
                iziToast.success({
                    title: CommonConstants.NOTIFY.CHECKOUT.DELETE_SHIPMENT_SUCCESS,
                    position: 'topCenter'
                })
            }
        })
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

    const applyEditShipmentDetails = (shipmentDetails) => {
        const cusId = cusInfo.googleId ? cusInfo.googleId : cusInfo.id
        const apiQuery = `${apiUrl}/customer/editShipmentDetail/${cusId}`
        ConnectionService.axiosPutByUrlWithToken(apiQuery, shipmentDetails)
        .then(async res => {
            if(res.success){
                orderAddresses.map((item) => { return item.isEditable = false })
                await applySetStateOrderAddresses(orderAddresses)
                CommonService.turnOffLoader()
                iziToast.success({
                    title: CommonConstants.NOTIFY.CHECKOUT.EDITED_SHIPMENT_SUCCESS,
                    position: 'topCenter'
                })
            }
        })
    }

    useEffect(() => {
        if(cartItems.length < 1) history.push('/shop')
        else if(!CommonService.isObjectEmpty(cusInfo)) applyGetOrderAddresses()
        return () => {}
    }, [cusInfo])
    return {userInputs, handleChange, handleSwitchAddress, handleChangedAddress, handleCancelChangedAddress,
        handleAddNewAddress, handleConfirmOrder, handleShowAddNewAddress, handleDeleteShipmentDetails,
        handleSetEditableShipment, handleEditShipmentDetail};
}

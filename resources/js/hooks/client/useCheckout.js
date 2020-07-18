import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../../config/CommonConstants'
import {useConnectionService, useCommonService} from '../HookManager'
import {useHistory} from 'react-router-dom'
import _ from 'lodash'
import iziToast from 'izitoast'

const apiUrl = CommonConstants.API_URL;

export default function useCheckout(initial, modalRef) {
    const CommonService = useCommonService()
    const ConnectionService = useConnectionService()
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
        const {name, value, validity, type, maxLength} = evt.target
        const isValidInputVal = (type === 'number' && validity.valid) || type !== 'number'
        const isValidInputLength = (maxLength > 0 && value.length <= maxLength) || maxLength === -1 || maxLength === undefined
        if(isValidInputVal && isValidInputLength){
            setUserInputs({...userInputs, [name]: value})
        }
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

    const handleConfirmOrder = async () => {
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
            const sendData = {
                'cus_id': cusId,
                'cart_items': items,
                'shipment_id': selectedAddress.id
            }
            CommonService.turnOnLoader()
            await ConnectionService.axiosPostByUrlWithToken(apiQuery, sendData)
            .then(res => {
                if(res.success){
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
            })
            CommonService.turnOffLoader()
        }
    }

    const handleShowAddNewAddress = (isShow) => {
        // reset userInputs & turn off show add new shipment details
        applySetUserInputs({}, isShow)
        // set all editable shipmentDetails to false
        orderAddresses.map((addr) => { return addr.isEditable = false })
    }

    const handleAddNewAddress = async () => {
        const apiQuery = `${apiUrl}/customer/createShipmentDetail`
        const sendData = _.cloneDeep(userInputs)
        delete sendData['isShowAddNewAddress']
        CommonService.turnOnLoader()
        await ConnectionService.axiosPostByUrlWithToken(apiQuery, sendData)
        .then(res => {
            if(res.success){
                orderAddresses.push(res.data)
                applySetStateOrderAddresses(orderAddresses)
                // empty userInputs after adding new address
                handleClearState()
            }
        })
        CommonService.turnOffLoader()
    }

    const handleDeleteShipmentDetails = (shipment_id) => {
        iziToast.question({
            timeout: false,
            overlay: true,
            displayMode: 'once',
            title: 'Delete',
            message: 'Are you sure want to delete?',
            position: 'center',
            buttons: [
                ['<button><b>YES</b></button>', function (instance, toast) {
                    applyDeleteShipmentDetail(shipment_id)
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
        const apiQuery = `${apiUrl}/customer/getOrderAddresses`
        CommonService.turnOnLoader()
        await ConnectionService.axiosGetByUrlWithToken(apiQuery)
        .then(res => {
            if(res.success){
                if(res.data.length > 0){
                    applySetStateOrderAddresses(res.data)
                    dispatch({type: 'SET_SELECTED_ADDRESS', payload: res.data[0]})
                }
            }
        })
        CommonService.turnOffLoader()
    }

    const applyDeleteShipmentDetail = async (shipment_id) => {
        const apiQuery = `${apiUrl}/customer/deleteShipmentDetail/${shipment_id}`
        CommonService.turnOnLoader()
        await ConnectionService.axiosDeleteByUrlWithToken(apiQuery)
        .then(res => {
            if(res.success){
                _.remove(orderAddresses, (item) => {
                    return item.id === shipment_id
                })
                if(selectedAddress.id === shipment_id){
                    orderAddresses[0].isChecked = true
                    dispatch({type: 'SET_SELECTED_ADDRESS', payload: orderAddresses[0]})
                }
                // set orderAddresses
                applySetStateOrderAddresses(orderAddresses)
                iziToast.success({
                    title: CommonConstants.NOTIFY.CHECKOUT.DELETE_SHIPMENT_SUCCESS,
                    position: 'topCenter'
                })
            }
        })
        CommonService.turnOffLoader()
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

    const applyEditShipmentDetails = async (shipmentDetails) => {
        const apiQuery = `${apiUrl}/customer/editShipmentDetail`
        CommonService.turnOnLoader()
        await ConnectionService.axiosPutByUrlWithToken(apiQuery, shipmentDetails)
        .then(res => {
            if(res.success){
                orderAddresses.map((item) => { return item.isEditable = false })
                applySetStateOrderAddresses(orderAddresses)
                iziToast.success({
                    title: CommonConstants.NOTIFY.CHECKOUT.EDITED_SHIPMENT_SUCCESS,
                    position: 'topCenter'
                })
            }
        })
        CommonService.turnOffLoader()
    }

    useEffect(() => {
        if(cartItems.length < 1) history.push('/shop')
        else if(!CommonService.isObjectEmpty(cusInfo) && CommonService.isObjectEmpty(orderAddresses)) applyGetOrderAddresses()
        return () => {}
    }, [cusInfo])
    return {userInputs, handleChange, handleSwitchAddress, handleChangedAddress, handleCancelChangedAddress,
        handleAddNewAddress, handleConfirmOrder, handleShowAddNewAddress, handleDeleteShipmentDetails,
        handleSetEditableShipment, handleEditShipmentDetail};
}

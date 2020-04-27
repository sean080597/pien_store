import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import ConnectionService from '../services/ConnectionService.service'

const apiUrl = CommonConstants.API_URL;

export default function useProductDetails(prod_id, initial){
    const dispatch = useDispatch()
    const [userInputs, setUserInputs] = useState(initial)
    const [productInfo, setProductInfo] = useState({})

    //handle
    const handleChange = async (evt) => {
        const {name, value} = evt.target;
        setUserInputs({...userInputs, [name]: value})
    }

    const handleChangeQuantity = async (evt) => {
        if(evt.target.value){
            const {name, value} = evt.target;
            setUserInputs({...userInputs, [name]: value})
        }
    }

    const handleReplaceProduct = (replace_product_id) => {
        window.location.replace('/productDetail/' + replace_product_id);
    }

    //apply
    const applyGetProductDetails = () => {
        const apiQuery = `${apiUrl}/product/getSingle/${prod_id}`
        ConnectionService.axiosGetByUrl(apiQuery)
        .then(async res => {
            await setProductInfo(res.data)
            await applyGetRelatedProducts()
            CommonService.turnOffLoader()
        })
    }

    const applyGetRelatedProducts = () => {
        const apiQuery = `${apiUrl}/product/getRelatedProduct/${prod_id}`
        ConnectionService.axiosGetByUrl(apiQuery)
        .then(async res => {
            await dispatch({type: 'SET_RELATED_PRODUCTS', payload: res.data})
            CommonService.turnOffLoader()
        })
    }

    useEffect(()=>{
        applyGetProductDetails()

        return () => {}
    }, [])

    return {productInfo, userInputs, handleChange, handleChangeQuantity, handleReplaceProduct};
}
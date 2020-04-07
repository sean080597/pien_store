import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import axios from 'axios'
import { trackPromise } from 'react-promise-tracker';

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
        trackPromise(
            axios.get(`${apiUrl}/product/getSingle/${prod_id}`)
            .then(async res => {
                await setProductInfo(res.data.data)
                await applyGetRelatedProducts()
            })
            .catch(error => {
                throw(error)
            })
        )
    }

    const applyGetRelatedProducts = () => {
        axios.get(`${apiUrl}/product/getRelatedProduct/${prod_id}`)
        .then(async res => {
            dispatch({type: 'SET_RELATED_PRODUCTS', payload: res.data.data})
        })
        .catch(error => {
            throw(error)
        })
    }

    useEffect(()=>{
        applyGetProductDetails()

        return () => {}
    }, [])

    return {productInfo, userInputs, handleChange, handleChangeQuantity, handleReplaceProduct};
}
/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CommonService from '../../services/CommonService.service'
import axios from 'axios';
import CommonConstants from '../../config/CommonConstants'
import {trackPromise} from 'react-promise-tracker'

const apiUrl = CommonConstants.API_URL;

export default function useShopCart(initial, componentName){
    const dispatch = useDispatch()
    const {currentPath} = useSelector(state => ({
        currentPath: state.currentPath
    }))
    const [filterInputs, setFilterInputs] = useState(initial)

    let isMounted = useRef(false);

    //handle
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFilterInputs({...filterInputs, [name]: value})
    }

    const handleSubmitFilter = async (evt) => {
        evt.preventDefault();
        CommonService.turnOnLoader()
        await applyProductsFilter()
    }

    const handlePaginate = async (pageIndex, filterData) => {
        CommonService.turnOnLoader()
        await applyProductsFilter(pageIndex, filterData)
    }

    //apply
    const applyCategoriesAll = () => {
        trackPromise(
            axios.get(`${apiUrl}/category/getAll`)
            .then(async res => {
                //dispatch
                await dispatch({type: 'SET_CATEGORIES', payload: res.data.data.data})
            }).catch(error => {
                throw (error);
            })
        )
    }

    const applyProductsFilter = (pageIndex, filterData) => {
        let apiQuery = `${apiUrl}/product/getAll/filterData${pageIndex ? '?page=' + pageIndex : ''}`
        let sendFilters = filterData || filterInputs
        trackPromise(
            axios.post(apiQuery, sendFilters)
            .then( async res => {
                let products = res.data.data.data
                delete res.data.data.data
                let pagination = res.data.data
                let storeData = {
                    products: products,
                    pagination: pagination
                }
                await dispatch({type: 'SET_PRODUCTS', payload: storeData})
            }).catch(error => {
                throw (error);
            })
        )
    }

    useEffect(()=>{
        //component will be undefined after redirecting to another route
        if(isMounted.current && componentName){
            applyCategoriesAll()
            if(currentPath.payload === '/shop') applyProductsFilter()
        }else{
            isMounted.current = true
        }
        return () => {}
    }, [currentPath.payload])

    return {filterInputs, handleChange, handleSubmitFilter, handlePaginate}
}
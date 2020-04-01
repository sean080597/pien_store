/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CommonService from '../../services/CommonService.service'
import axios from 'axios';
import CommonConstants from '../../config/CommonConstants'
import {trackPromise} from 'react-promise-tracker'
import iziToast from 'izitoast'

const apiUrl = CommonConstants.API_URL;

export default function useShopCart(initial, componentName){
    const dispatch = useDispatch()
    const {isLoggedIn, currentPath, cartItems} = useSelector(state => ({
        isLoggedIn: state.auth.loggedIn,
        currentPath: state.currentPath,
        cartItems: state.shop.cartItems
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

    const handleAddToCart = async (product) => {
        if(isLoggedIn){
            await applyAddToCart(product)
            iziToast.success({
                title: CommonConstants.NOTIFY.SHOP.ADDED_TO_CART,
            });
        }else{
            iziToast.show({
                theme: 'dark',
                icon: 'fa fa-sign-in',
                title: 'Please login to order!',
                position: 'topCenter'
            })
        }
    }

    const handleChangeQuantity = async (evt, product) => {
        if(evt.target.value){
            await applyAddToCart(product, parseInt(evt.target.value))
        }
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
                CommonService.goToPosition('#section-filter')
            }).catch(error => {
                throw (error);
            })
        )
    }

    const applyAddToCart = (product, quantity = 1) => {
        let updateCartItems = cartItems
        if(updateCartItems.some(item => item.id === product.id)){
            updateCartItems.map(item =>{
                // item.id === product.id ? {...item, quantity: updateQuantity} : item
                if(item.id === product.id){
                    item.quantity = (quantity === 1) ? ++item.quantity : quantity
                }
                return item
            })
            console.log(updateCartItems)
        }else{
            product.quantity = 1
            updateCartItems.push(product)
        }
        // console.log(updateCartItems)
        //set CartItems redux
        applySetCartItems(updateCartItems)
        localStorage.setItem(CommonConstants.LOCALSTORAGE_NAME, JSON.stringify(updateCartItems))
    }

    const applySetCartItems = (updateCartItems) => {
        dispatch({type: 'SET_CART_ITEMS', payload: updateCartItems})
        const count = updateCartItems.reduce((c, prod) => c + prod.quantity, 0)
        dispatch({type: 'SET_CART_COUNT', payload: count})
        const total = updateCartItems.reduce((t, prod) => t + prod.price * prod.quantity, 0)
        dispatch({type: 'SET_CART_TOTAL', payload: total})
    }

    useEffect(()=>{
        //component will be undefined after redirecting to another route
        if(isMounted.current && componentName){
            applyCategoriesAll()
            if(currentPath.payload === '/shop') applyProductsFilter()
        }else{
            isMounted.current = true
        }
        return () => {
            applySetCartItems(JSON.parse(localStorage.getItem(CommonConstants.LOCALSTORAGE_NAME)))
        }
    }, [currentPath.payload])

    return {filterInputs, handleChange, handleSubmitFilter, handlePaginate, handleAddToCart, handleChangeQuantity}
}
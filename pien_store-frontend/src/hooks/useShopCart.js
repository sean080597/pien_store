/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import CommonService from '../services/CommonService.service'
import axios from 'axios';
import CommonConstants from '../config/CommonConstants'
import Cookie from 'js-cookie'
import {trackPromise} from 'react-promise-tracker'
import iziToast from 'izitoast'

const apiUrl = CommonConstants.API_URL;
const routeCanGetCategoriesAll = ['/', '/shop']
const routeCanGetProductsAll = ['/shop']

export default function useShopCart(initial, componentName){
    const history = useHistory()
    const dispatch = useDispatch()
    const {isLoggedIn, currentPath, cartItems, allCategories, allProducts} = useSelector(state => ({
        isLoggedIn: state.auth.loggedIn,
        currentPath: state.common.currentPath,
        cartItems: state.shop.cartItems,
        allCategories: state.shop.categories,
        allProducts: state.shop.products
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
        await applyProductsFilter()
        CommonService.goToPosition('#section-filter')
    }

    const handlePaginate = async (pageIndex, filterData) => {
        await applyProductsFilter(pageIndex, filterData)
        CommonService.goToPosition('#section-filter')
    }

    const handleAddToCart = async (product, quantity = 1) => {
        if(isLoggedIn){
            await applyAddToCart(product, parseInt(quantity))
            iziToast.success({
                title: CommonConstants.NOTIFY.SHOP.ADDED_TO_CART,
            });
        }else{
            iziToast.show({
                theme: 'dark',
                icon: 'fa fa-sign-in',
                title: CommonConstants.NOTIFY.SHOP.CANCELED_ADD_TO_CART,
                position: 'topCenter'
            })
        }
    }

    const handleChangeQuantity = async (evt, product) => {
        if(evt.target.value){
            await applyAddToCart(product, parseInt(evt.target.value))
        }
    }

    const handleGoToCheckoutPage = () => {
        history.push('/checkout')
    }

    const handleSubtractQuantity = (product) => {
        applyAddSubtractQuantity(product, -1)
    }

    const handleAddQuantity = (product) => {
        applyAddSubtractQuantity(product)
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
    //use for button AddToCart on Image and change quantity of input quantity
    const applyAddToCart = (product, quantity = 1) => {
        if(cartItems.some(item => item.id === product.id)){
            cartItems.map(item =>{
                // item.id === product.id ? {...item, quantity: updateQuantity} : item
                if(item.id === product.id){
                    if(currentPath.includes('/productDetail')){
                        item.quantity += quantity
                    }else{
                        currentPath.includes('/cart') ? (item.quantity = quantity) : (item.quantity = ++item.quantity)
                    }
                }
                return item
            })
        }else{
            product.quantity = 1
            cartItems.push(product)
        }
        //set CartItems redux
        applySetCartItems(cartItems)
    }

    const applySetCartItems = (updateCartItems) => {
        dispatch({type: 'SET_CART_ITEMS', payload: updateCartItems})
        const count = updateCartItems.reduce((c, prod) => c + prod.quantity, 0)
        dispatch({type: 'SET_CART_COUNT', payload: count})
        const total = updateCartItems.reduce((t, prod) => t + prod.price * prod.quantity, 0)
        dispatch({type: 'SET_CART_TOTAL', payload: total})
        localStorage.setItem(CommonConstants.LOCALSTORAGE_NAME, JSON.stringify(updateCartItems))
    }

    const applyRemoveCartItem = (item) => {
        let updateCartItems = cartItems.filter((obj) => {
            return obj.id !== item.id
        })
        applySetCartItems(updateCartItems)
    }

    const applyAddSubtractQuantity = (product, quantity = 1) => {
        cartItems.map(item => {
            if(item.id === product.id && currentPath.includes('/cart')){
                item.quantity += ((item.quantity + quantity) > 0) ? quantity : 0
            }
            return item
        })
        applySetCartItems(cartItems)
    }

    useEffect(()=>{
        //component will be undefined after redirecting to another route then should pass componetName
        if(isMounted.current && componentName){
            if (routeCanGetCategoriesAll.some(t => t === currentPath) && allCategories.length < 1) applyCategoriesAll()
            if (routeCanGetProductsAll.some(t => t === currentPath) && allProducts.length < 1) applyProductsFilter()
        }else{
            isMounted.current = true
        }
        return () => {
            if(localStorage.getItem(CommonConstants.LOCALSTORAGE_NAME))
                applySetCartItems(JSON.parse(localStorage.getItem(CommonConstants.LOCALSTORAGE_NAME)))
        }
    }, [currentPath])

    return {
        filterInputs, handleChange, handleSubmitFilter, handlePaginate, handleAddToCart,
        handleChangeQuantity, applyRemoveCartItem, handleGoToCheckoutPage, handleSubtractQuantity, handleAddQuantity
    }
}
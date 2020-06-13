/* eslint-disable react-hooks/exhaustive-deps */
import CommonService from '../../../services/CommonService.service'
import ConnectionService from '../../../services/ConnectionService.service'
import {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import CommonConstants from '../../../config/CommonConstants'
import iziToast from 'izitoast'
import _ from 'lodash'

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
    let sendPaginateFilters = useRef(initial)

    //handle
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFilterInputs({...filterInputs, [name]: value})
    }

    const handleSubmitFilter = async (evt) => {
        evt.preventDefault();
        sendPaginateFilters.current = filterInputs
        await applyProductsFilter()
        CommonService.goToPosition('#section-filter')
    }

    const handlePaginate = async (pageIndex) => {
        await applyProductsFilter(pageIndex)
        CommonService.goToPosition('#section-filter')
    }

    const handleAddToCart = async (product, quantity = 1) => {
        await applyAddToCart(product, parseInt(quantity))
        iziToast.success({
            title: CommonConstants.NOTIFY.SHOP.ADDED_TO_CART,
        });
    }

    const handleChangeQuantity = async (evt, product) => {
        if(evt.target.value){
            await applyAddToCart(product, parseInt(evt.target.value))
        }
    }

    const handleGoToCheckoutPage = () => {
        if(isLoggedIn){
            history.push('/customer/checkout')
        }else{
            iziToast.show({
                theme: 'dark',
                icon: 'fa fa-sign-in',
                title: CommonConstants.NOTIFY.SHOP.CANCELED_GO_TO_CHECKOUT,
                position: 'topCenter'
            })
        }
    }

    const handleSubtractQuantity = (product) => {
        applyAddSubtractQuantity(product, -1)
    }

    const handleAddQuantity = (product) => {
        applyAddSubtractQuantity(product)
    }

    //apply
    const applyCategoriesAll = () => {
        const apiQuery = `${apiUrl}/category/searchData`
        ConnectionService.axiosPostByUrl(apiQuery)
        .then(async res => {
            await dispatch({type: 'SET_CATEGORIES', payload: res.data})
            CommonService.turnOffLoader()
        })
    }

    const applyProductsFilter = (pageIndex) => {
        const apiQuery = `${apiUrl}/product/getAll/filterData${pageIndex ? '?page=' + pageIndex : ''}`
        ConnectionService.axiosPostByUrl(apiQuery, sendPaginateFilters.current)
        .then(async res => {
            let products = res.data.data
            // delete products list to take all pagination info
            delete res.data.data
            await dispatch({type: 'SET_PRODUCTS', payload: products})
            await dispatch({type: 'SET_PAGINATION', payload: res.data})
            CommonService.turnOffLoader()
        })
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
        iziToast.question({
            timeout: false,
            overlay: true,
            displayMode: 'once',
            title: 'Remove',
            message: 'Are you sure want to remove?',
            position: 'center',
            buttons: [
                ['<button><b>YES</b></button>', async (instance, toast) => {
                    const updateCartItems = cartItems.filter((obj) => {
                        return obj.id !== item.id
                    })
                    await applySetCartItems(updateCartItems)
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }, true],
                ['<button>NO</button>', async (instance, toast) => {
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }],
            ]
        })
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
            if (currentPath.includes('/cart')) CommonService.turnOffLoader()
        }else{
            isMounted.current = true
        }
        return () => {}
    }, [currentPath])

    return {
        filterInputs, handleChange, handleSubmitFilter, handlePaginate, handleAddToCart,
        handleChangeQuantity, applyRemoveCartItem, handleGoToCheckoutPage, handleSubtractQuantity, handleAddQuantity
    }
}
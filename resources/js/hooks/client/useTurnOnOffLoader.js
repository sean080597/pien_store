import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../../config/CommonConstants'
import { useGoogleLogin, useCommonService } from '../HookManager'
// import Cookie from 'js-cookie'
// import axios from 'axios'
// import {usePromiseTracker} from 'react-promise-tracker'

export default function useTurnOnOffLoader() {
    const CommonService = useCommonService()
    const dispatch = useDispatch()
    const {curPath, cartCount} = useSelector(state => ({
        curPath: state.common.currentPath,
        cartCount: state.shop.cartCount
    }))
    // const {isLoggedIn} = useSelector(state => state.auth.loggedIn)
    // const { promiseInProgress } = usePromiseTracker({delay: 500})

    const applySetCartItems = (updateCartItems) => {
        dispatch({type: 'SET_CART_ITEMS', payload: updateCartItems})
        const count = updateCartItems.reduce((c, prod) => c + prod.quantity, 0)
        dispatch({type: 'SET_CART_COUNT', payload: count})
        const total = updateCartItems.reduce((t, prod) => t + prod.price * prod.quantity, 0)
        dispatch({type: 'SET_CART_TOTAL', payload: total})
        localStorage.setItem(CommonConstants.LOCALSTORAGE_NAME, JSON.stringify(updateCartItems))
    }

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PATH', payload: window.location.pathname})
        dispatch({type: 'SET_FALSE_IS_FIRST_LOADED'})
        CommonService.goToPosition()
        return () => {
            if(localStorage.getItem(CommonConstants.LOCALSTORAGE_NAME) && cartCount === 0)
                applySetCartItems(JSON.parse(localStorage.getItem(CommonConstants.LOCALSTORAGE_NAME)))
        }
    }, [curPath])
    return;
}

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonService from '../services/CommonService.service'
// import Cookie from 'js-cookie'
// import CommonConstants from '../config/CommonConstants'
// import axios from 'axios'
// import {usePromiseTracker} from 'react-promise-tracker'

export default function useTurnOnOffLoader() {
    const dispatch = useDispatch()
    // const {isLoggedIn} = useSelector(state => state.auth.loggedIn)
    // const { promiseInProgress } = usePromiseTracker({delay: 500})

    useEffect(() => {
        dispatch({type: 'SET_PAYLOAD_DIRECTLY', payload: window.location.pathname})
        dispatch({type: 'SET_FALSE_IS_FIRST_LOADED'})
        CommonService.goToPosition()
        // if(!isLoggedIn){
        //     if(Cookie.get('access_token')){
        //         axios.post(`${CommonConstants.API_URL}/user/logout`, null, {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer ${Cookie.get('access_token')}`
        //             }
        //         }).then(res => {
        //             if(res.data.success) Cookie.remove('access_token')
        //         })
        //         .catch(error => {
        //             throw (error);
        //         })
        //     }
        //     //remove localStorage
        //     localStorage.removeItem(CommonConstants.LOCALSTORAGE_NAME)
        //     Cookie.remove('google_token')
        // }
        // return () => {}
    }, [])
    return;
}

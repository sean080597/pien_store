/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import {useHistory} from 'react-router-dom'
import Cookie from 'js-cookie'
import moment from "moment";
import axios from 'axios'
import PageLoadService from '../../services/PageLoadService.service'
import CommonConstants from '../../config/CommonConstants'
import {trackPromise} from 'react-promise-tracker'

// const apiUrl = window.location.origin + '/api/user';
const apiUrl = CommonConstants.API_URL + '/user';

export default function useGoogleLogin(){
    const dispatch = useDispatch()
    const setCookieToken = (resGoogle, resJWT) => {
        let expiryIn = resGoogle.tokenObj.expires_in
        let expiryDate = moment(new Date()).add(expiryIn, 's').toDate()
        // setCookie('token', res.accessToken, { path: '/', httpOnly: true, sameSite: 'lax', expires: expiryDate})
        Cookie.set('google_token', resGoogle.accessToken, { sameSite: 'strict', expires: expiryDate})
        //set cookie jwt token
        Cookie.set('access_token', resJWT.token, { sameSite: 'strict', expires: expiryDate})
        //set headers for redux state
        const apiHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('access_token')}`
        }
        dispatch({type: 'SET_API_HEADERS', payload:apiHeaders})
    }
    const headers = useSelector(state => state.common.apiHeaders)

    const applyGoogleLogin = (resGoogle) => {
        const sendData = {
            'googleId': resGoogle.googleId,
            'email': resGoogle.profileObj.email,
            'expiresIn':  resGoogle.tokenObj.expires_in
        }
        trackPromise(
            axios.post(`${apiUrl}/authGoogleLogin`, sendData)
            .then(async resJWT => {
                //dispatch
                await dispatch({type: 'LOGIN_GOOGLE', payload: resGoogle})
                await setCookieToken(resGoogle, resJWT.data)
                //recall event hover dropdown
                await PageLoadService.setNavbarHoverDropdown()
            }).catch(error => {
                throw (error);
            })
        )
    }

    const applyGoogleLogout = async () => {
        trackPromise(
            axios.post(`${apiUrl}/logout`, null, { headers: headers })
            .then(() => {
                dispatch({type: 'LOGOUT_GOOGLE'})
                //reset CartItems redux state
                dispatch({type: 'SET_CART_ITEMS', payload: []})
                dispatch({type: 'SET_CART_COUNT', payload: 0})
                dispatch({type: 'SET_CART_TOTAL', payload: 0})
                dispatch({type: 'SET_USER_PROFILE', payload: {}})
                //remove localStorage
                localStorage.removeItem(CommonConstants.LOCALSTORAGE_NAME)
                Cookie.remove('google_token')
                Cookie.remove('access_token')
            })
            .catch(error => {
                throw (error);
            })
        )
    }

    useEffect(() => {
        // if(cookies.access_token){
        //     applyGoogleLogout()
        // }
        return () => {}
    }, [])

    return {applyGoogleLogin, applyGoogleLogout};
}
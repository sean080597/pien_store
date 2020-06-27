/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import Cookie from 'js-cookie'
import moment from "moment";
import PageLoadService from '../../../services/PageLoadService.service'
import CommonConstants from '../../../config/CommonConstants'
import ConnectionService from '../../../services/ConnectionService.service'
import CommonService from '../../../services/CommonService.service';

const apiUrl = CommonConstants.API_URL;

export default function useGoogleLogin(){
    const dispatch = useDispatch()
    const setCookieToken = (resGoogle, resJWT) => {
        let expiryIn = resGoogle.tokenObj.expires_in
        let expiryDate = moment(new Date()).add(expiryIn, 's').toDate()
        // setCookie('token', res.accessToken, { path: '/', httpOnly: true, sameSite: 'lax', expires: expiryDate})
        Cookie.set('google_token', resGoogle.accessToken, { sameSite: 'strict', expires: expiryDate})
        //set cookie jwt token
        Cookie.set('access_token', resJWT.token, { sameSite: 'strict', expires: expiryDate})
    }

    const applyGoogleLogin = (resGoogle) => {
        const apiQuery = `${apiUrl}/user/authGoogleLogin`
        const sendData = {
            'googleId': resGoogle.googleId,
            'email': resGoogle.profileObj.email,
            'expiresIn':  resGoogle.tokenObj.expires_in
        }
        ConnectionService.axiosPostByUrl(apiQuery, sendData)
        .then(async resJWT => {
            resGoogle.profileObj.role = resJWT.role
            //dispatch
            await dispatch({type: 'LOGIN_GOOGLE', payload: resGoogle})
            await setCookieToken(resGoogle, resJWT)
            //recall event hover dropdown
            await PageLoadService.setNavbarHoverDropdown()
            CommonService.turnOffLoader()
        })
    }

    const applyGoogleLogout = async () => {
        const apiQuery = `${apiUrl}/user/logout`
        ConnectionService.axiosPostByUrlWithToken(apiQuery)
        .then(res => {
            if(res.success){
                dispatch({type: 'LOGOUT_USER'})
                //reset CartItems redux state
                dispatch({type: 'SET_CART_ITEMS', payload: []})
                dispatch({type: 'SET_CART_COUNT', payload: 0})
                dispatch({type: 'SET_CART_TOTAL', payload: 0})
                dispatch({type: 'SET_USER_PROFILE', payload: {}})
                //remove localStorage
                localStorage.removeItem(CommonConstants.LOCALSTORAGE_NAME)
                Cookie.remove('google_token')
                Cookie.remove('access_token')
                CommonService.turnOffLoader()
            }
        })
    }

    useEffect(() => {
        return () => {}
    }, [])

    return {applyGoogleLogin, applyGoogleLogout};
}
/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useCookies} from 'react-cookie'
import moment from "moment";
import axios from 'axios'
import CommonService from '../../services/CommonService.service'
import PageLoadService from '../../services/PageLoadService.service'
import CommonConstants from '../../config/CommonConstants'
import {trackPromise} from 'react-promise-tracker'

// const apiUrl = window.location.origin + '/api/user';
const apiUrl = CommonConstants.API_URL + '/user';

export default function useGoogleLogin(){
    const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies({});

    const setCookieToken = (resGoogle, resJWT) => {
        let expiryIn = resGoogle.tokenObj.expires_in
        let expiryDate = moment(new Date()).add(expiryIn, 's').toDate()
        // setCookie('token', res.accessToken, { path: '/', httpOnly: true, sameSite: 'lax', expires: expiryDate})
        setCookie('google_token', resGoogle.accessToken, { sameSite: 'lax', expires: expiryDate})
        //set cookie jwt token
        setCookie('access_token', resJWT.token, { sameSite: 'lax', expires: expiryDate})
    }

    const applyGoogleLogin = (resGoogle) => {
        const sendData = {
            'googleId': resGoogle.googleId,
            'email': resGoogle.profileObj.email,
            'firstname': resGoogle.profileObj.name,
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
        await dispatch({type: 'LOGOUT_GOOGLE'})
        await removeCookie('google_token')
        await removeCookie('access_token')
    }

    useEffect(() => {
        // if(cookies.access_token){
        //     applyGoogleLogout()
        // }
        return () => {}
    }, [])

    return {applyGoogleLogin, applyGoogleLogout};
}
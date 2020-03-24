/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch} from 'react-redux'
import {useCookies} from 'react-cookie'
import moment from "moment";
import axios from 'axios'
import CommonService from '../../services/CommonService.service'
import PageLoadService from '../../services/PageLoadService.service'
import CommonConstants from '../../config/CommonConstants'

// const apiUrl = window.location.origin + '/api/user';
const apiUrl = CommonConstants.API_URL + '/user';

export default function useGoogleLogin(){
    const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies({});

    const setCookieToken = (resGoogle, resJWT) => {
        let expiryIn = resGoogle.tokenObj.expires_in
        let expiryDate = moment(new Date()).add(expiryIn, 's').toDate()
        // setCookie('token', res.accessToken, { path: '/', httpOnly: true, sameSite: 'lax', expires: expiryDate})
        setCookie('google_token', resGoogle.accessToken, { path: '/', sameSite: 'lax', expires: expiryDate})
        //set cookie jwt token
        setCookie('access_token', resJWT.token, { path: '/', sameSite: 'lax', expires: expiryDate})
    }

    const applyGoogleLogin = (resGoogle) => {
        CommonService.turnOnLoader()
        const sendData = {
            'googleId': resGoogle.googleId,
            'email': resGoogle.profileObj.email,
            'firstname': resGoogle.profileObj.name,
            'expiresIn':  resGoogle.tokenObj.expires_in
        }
        axios.post(`${apiUrl}/authGoogleLogin`, sendData)
        .then(async resJWT => {
            //dispatch
            await dispatch({type: 'LOGIN_GOOGLE', payload: resGoogle})
            await setCookieToken(resGoogle, resJWT.data)
            //recall event hover dropdown
            await PageLoadService.setNavbarHoverDropdown()
            CommonService.turnOffLoader()
        })
        .catch(error => {
            CommonService.turnOffLoader()
            throw (error);
        });
    }

    const applyGoogleLogout = async () => {
        CommonService.turnOnLoader()
        await dispatch({type: 'LOGOUT_GOOGLE'})
        await removeCookie('google_token')
        await removeCookie('access_token')
        CommonService.turnOffLoader()
    }

    return {applyGoogleLogin, applyGoogleLogout};
}
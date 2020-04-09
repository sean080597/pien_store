import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import {trackPromise} from 'react-promise-tracker'
import Cookie from 'js-cookie'
import axios from 'axios'
import iziToast from 'izitoast'

const apiUrl = CommonConstants.API_URL;

export default function useCheckout(initial, modalRef) {
    const dispatch = useDispatch()

    const [userInputs, setUserInputs] = useState(initial)

    //handle
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserInputs({...userInputs, [name]: value})
    }

    const handleSubmitInfo = async (evt) => {
        evt.preventDefault();
        
    }

    //apply
    const applyGetUserProfile = async () => {
        trackPromise(
            axios.post(`${apiUrl}/user/me`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookie.get('access_token')}`
                }
            }).then(async res => {
                // await applySetUserInfo(res.data)
                await dispatch({type: 'SET_USER_PROFILE', payload: res.data})
            }).catch(error => {
                throw (error);
            })
        )
    }

    useEffect(() => {
        applyGetUserProfile()
        return () => {}
    }, [])
    return {userInputs, handleChange, handleSubmitInfo};
}

import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../../config/CommonConstants'
import {trackPromise} from 'react-promise-tracker'
import Cookie from 'js-cookie'
import axios from 'axios'

const apiUrl = CommonConstants.API_URL;

export default function useConfirmInfo(initial) {
    const dispatch = useDispatch()
    const {userProfile} = useSelector(state => state.auth.profile)
    const [userInputs, setUserInputs] = useState(initial)

    //handle
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserInputs({...userInputs, [name]: value})
    }

    const handleSubmitInfo = async (evt) => {
        evt.preventDefault();
        await applyUpdateUserProfile()
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
                await applySetUserInfo(res.data)
                await dispatch({type: 'SET_USER_PROFILE', payload: res.data})
            }).catch(error => {
                throw (error);
            })
        )
    }
    //set userInputs
    const applySetUserInfo = (user) => {
        setUserInputs({...userInputs,
            firstname: user.firstname?user.firstname:'',
            lastname: user.lastname?user.lastname:'',
            gender: user.gender,
            phone: user.phone?user.phone:'',
            address: user.address?user.address:''})
    }
    //update redux store
    const applySetUserInfoReduxState = (userProfile) => {
        userProfile.firstname = userInputs.firstname
        userProfile.lastname = userInputs.lastname
        userProfile.gender = userInputs.gender
        userProfile.phone = userInputs.phone
        userProfile.address = userInputs.address
    }

    const applyUpdateUserProfile = () => {
        trackPromise(
            axios.post(`${apiUrl}/user/updateCustomerInfo`, userInputs, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookie.get('access_token')}`
                }
            }).then(async res => {
                if(res.data.success){
                    await applySetUserInfoReduxState(userProfile)
                    await dispatch({type: 'SET_USER_PROFILE', payload: userProfile})
                }
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

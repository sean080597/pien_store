import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../../config/CommonConstants'
import CommonService from '../../services/CommonService.service'
import {trackPromise} from 'react-promise-tracker'
import Cookie from 'js-cookie'
import axios from 'axios'
import iziToast from 'izitoast'

const apiUrl = CommonConstants.API_URL;

export default function useUserProfile(initial, modalRef) {
    const dispatch = useDispatch()
    const {userProfile, headers} = useSelector(state => ({
        userProfile: state.auth.profile,
        headers: state.common.apiHeaders
    }))
    const [userInputs, setUserInputs] = useState(initial)
    //handle
    const handleChange = (evt) => {
        const {name, value, validity} = evt.target;
        if((name === 'phone' && validity.valid) || name !== 'phone'){
            setUserInputs({...userInputs, [name]: value})
        }
    }

    const handleSubmitInfo = async (evt) => {
        evt.preventDefault();
        await applyUpdateUserProfile()
    }

    //apply
    const applyGetUserProfile = async () => {
        trackPromise(
            axios.post(`${apiUrl}/user/me`, null, { headers: headers })
            .then(async res => {
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
            axios.post(`${apiUrl}/user/updateCustomerInfo`, userInputs, { headers: headers })
            .then(async res => {
                if(res.data.success){
                    await applySetUserInfoReduxState(userProfile)
                    await dispatch({type: 'SET_USER_PROFILE', payload: userProfile})
                    modalRef.current.closeModal()
                    iziToast.success({
                        title: CommonConstants.NOTIFY.PRODUCT_DETAILS.UPDATED_CUSTOMER_INFO,
                    });
                }
            }).catch(error => {
                throw (error);
            })
        )
    }

    useEffect(() => {
        if(CommonService.isObjectEmpty(userProfile) && CommonService.hasValueNotNull(headers.Authorization)) applyGetUserProfile()
        else applySetUserInfo(userProfile)
        return () => {}
    }, [headers])
    return {userInputs, handleChange, handleSubmitInfo};
}

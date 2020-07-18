import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../../../config/CommonConstants'
import {useConnectionService, useCommonService} from '../../HookManager'
import iziToast from 'izitoast'

const apiUrl = CommonConstants.API_URL;

export default function useUserProfile(initial, modalRef) {
    const CommonService = useCommonService()
    const ConnectionService = useConnectionService()
    const dispatch = useDispatch()
    const {userProfile} = useSelector(state => ({
        userProfile: state.auth.profile
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
        evt.preventDefault()
        await applyUpdateUserProfile()
    }

    //apply
    const applyGetUserProfile = async () => {
        const apiQuery = `${apiUrl}/user/me`
        CommonService.turnOnLoader()
        await ConnectionService.axiosPostByUrlWithToken(apiQuery)
        .then(res => {
            applySetUserInfo(res)
            dispatch({type: 'SET_USER_PROFILE', payload: res})
        })
        CommonService.turnOffLoader()
    }
    //set userInputs
    const applySetUserInfo = (user) => {
        setUserInputs({...userInputs,
            firstname: user.firstname ? user.firstname : '',
            lastname: user.lastname ? user.lastname : '',
            gender: user.gender,
            phone: user.phone ? user.phone : '',
            address: user.address ? user.address : ''})
    }
    //update redux store
    const applySetUserInfoReduxState = (userProfile) => {
        userProfile.firstname = userInputs.firstname
        userProfile.lastname = userInputs.lastname
        userProfile.gender = userInputs.gender
        userProfile.phone = userInputs.phone
        userProfile.address = userInputs.address
    }

    const applyUpdateUserProfile = async () => {
        const apiQuery = `${apiUrl}/customer/updateCustomerInfo`
        CommonService.turnOnLoader()
        await ConnectionService.axiosPostByUrlWithToken(apiQuery, userInputs)
        .then(res => {
            if(res.success){
                applySetUserInfoReduxState(userProfile)
                dispatch({type: 'SET_USER_PROFILE', payload: userProfile})
                modalRef.current.closeModal()
                iziToast.success({
                    title: CommonConstants.NOTIFY.PRODUCT_DETAILS.UPDATED_CUSTOMER_INFO,
                });
            }
        })
        CommonService.turnOffLoader()
    }

    useEffect(() => {
        if(CommonService.isObjectEmpty(userProfile)) applyGetUserProfile()
        else applySetUserInfo(userProfile)
        return () => {}
    }, [])
    return {userInputs, handleChange, handleSubmitInfo};
}

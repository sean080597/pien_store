import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import CommonService from '../../../services/CommonService.service'
import ConnectionService from '../../../services/ConnectionService.service'
import CommonConstants from '../../../config/CommonConstants'
import moment from 'moment'
import Cookie from 'js-cookie'

const apiUrl = CommonConstants.API_URL;

export default function useFormLogin(initital, validate) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [userInputs, setUserInputs] = useState(initital)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setSubmitting] = useState(false)

    // methods
    const setCookieToken = (resJWT) => {
        let expiryIn = 3600
        let expiryDate = moment(new Date()).add(expiryIn, 's').toDate()
        // setCookie('token', res.accessToken, { path: '/', httpOnly: true, sameSite: 'lax', expires: expiryDate})
        //set cookie jwt token
        Cookie.set('access_token', resJWT.token, { sameSite: 'strict', expires: expiryDate})
    }

    const handleChange = (evt) => {
        // const name = evt.target.name;
        // const newValue = evt.target.value;
        const {name, value} = evt.target;
        setUserInputs({...userInputs, [name]: value})
    }

    const handleBlur = () => {
        const validationErrors = validate(userInputs)
        setErrors(validationErrors)
    }

    const handleSubmitLogin = async (evt) => {
        evt.preventDefault();
        const validationErrors = validate(userInputs)
        setErrors(validationErrors)
        setSubmitting(true)
    }

    useEffect(() => {
        if(isSubmitting){
            const noErrors = Object.keys(errors).length === 0
            if(noErrors){
                CommonService.turnOnLoader()
                const apiQuery = `${apiUrl}/user/login`
                ConnectionService.axiosPostByUrl(apiQuery, userInputs)
                .then(async resJWT => {
                    //dispatch
                    await dispatch({type: 'LOGIN_ADMIN', payload: resJWT})
                    await setCookieToken(resJWT)
                    history.push('/admin-su')
                    CommonService.turnOffLoader()
                })
                .catch(e => {
                    // setErrors(e.response.data)
                    setErrors({'wrongInfo': CommonConstants.MSG.ERROR.WRONG_LOGIN_INFO})
                    CommonService.turnOffLoader()
                })
            }
            setSubmitting(false)
        }
    }, [errors])

    return {userInputs, handleChange, handleSubmitLogin, handleBlur, errors, isSubmitting}
}

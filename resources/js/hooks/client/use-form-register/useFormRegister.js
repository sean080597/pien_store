import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useCommonService} from '../../HookManager'
import CommonConstants from '../../config/CommonConstants'
import axios from 'axios'

export default function useFormLogin(initital, validate) {
    const CommonService = useCommonService()
    const history = useHistory();
    const [userInputs, setUserInputs] = useState(initital)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setSubmitting] = useState(false)

    useEffect(() => {
        if(isSubmitting){
            const noErrors = Object.keys(errors).length === 0
            if(noErrors){
                CommonService.turnOnLoader()
                axios.post('http://localhost:8000/api/user/login', userInputs)
                .then(res => {
                    history.push('/profile')
                })
                .catch(e => {
                    // setErrors(e.response.data)
                    setErrors({'wrongInfo': CommonConstants.ERRORS.WRONG_LOGIN_INFO})
                    CommonService.turnOffLoader()
                })
            }
            setSubmitting(false)
        }
    }, [errors])

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

    return {userInputs, handleChange, handleSubmitLogin, handleBlur, errors, isSubmitting}
}

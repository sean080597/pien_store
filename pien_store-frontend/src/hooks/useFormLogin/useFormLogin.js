import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import CommonService from '../../services/CommonService.service'

export default function useFormLogin(initital, validate) {
    const history = useHistory();
    const [userInputs, setUserInputs] = useState(initital)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setSubmitting] = useState(false)

    useEffect(() => {
        if(isSubmitting){
            const noErrors = Object.keys(errors).length === 0
            if(noErrors){
                console.log('Authenticated!', userInputs.email, userInputs.password)
                history.push('/profile')
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

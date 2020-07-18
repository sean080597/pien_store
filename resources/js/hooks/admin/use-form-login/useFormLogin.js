import {useState, useEffect} from 'react'
import {useAdminService} from '../../HookManager'

export default function useFormLogin(initital, validate) {
    const AdminService = useAdminService()

    const [userInputs, setUserInputs] = useState(initital)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setSubmitting] = useState(false)

    // methods
    const handleChange = (evt) => {
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
                const res = AdminService.login(userInputs)
                if(!res.isSuccess) setErrors({'wrongInfo': res.message})
            }
            setSubmitting(false)
        }
    }, [errors])

    return {userInputs, handleChange, handleSubmitLogin, handleBlur, errors, isSubmitting}
}

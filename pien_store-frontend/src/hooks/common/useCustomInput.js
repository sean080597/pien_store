import {useState} from 'react'
import CommonConstants from '../../config/CommonConstants'

export default function useCustomInput(inputVal, inputType, parentOnChange){
    const [userInput, setUserInput] = useState(inputVal)
    const [error, setError] = useState()
    const regexEmail = new RegExp("^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9]{2,4})$")
    // handle
    const handleChange = (evt) => {
        const {value, validity, type, maxLength} = evt.target
        const isValidInput = ((type === 'number' && validity.valid) || type !== 'number') && ((maxLength > 0 && value.length <= maxLength) || maxLength === -1)
        if(isValidInput){
            setUserInput(value)
            parentOnChange(evt)
        }
    }

    const handleBlur = () => {
        const validationError = validateInputValues(userInput, inputType)
        setError(validationError)
    }

    // apply
    const validateInputValues = (val, type) => {
        let errorMsg = ''
        switch (type) {
            case 'email':
                if(!val) errorMsg = CommonConstants.MSG.ERROR.REQUIRED_EMAIL
                else if(!regexEmail.test(val)) errorMsg = CommonConstants.MSG.ERROR.INVALID_EMAIL
                break;
            case 'password':
                if(!val) errorMsg = CommonConstants.MSG.ERROR.REQUIRED_PASSWORD
                else if(val.length < 6) errorMsg = CommonConstants.MSG.ERROR.AT_LEAST_6_CHARACTERS_SHORT
                break;
            default:
                break;
        }
        return errorMsg
    }

    return {userInput, error, handleChange, handleBlur}
}
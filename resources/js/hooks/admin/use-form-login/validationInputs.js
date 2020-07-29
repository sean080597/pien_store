import CommonConstants from '../../../config/CommonConstants'

export default function validateAuth(values){
    let errors = {}
    //email error
    if(!values.email){
        errors.email = CommonConstants.ERRORS.REQUIRED_EMAIL
    }else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i.test(values.email)){
        errors.email = CommonConstants.ERRORS.INVALID_EMAIL
    }
    //password error
    if(!values.password){
        errors.password = CommonConstants.ERRORS.REQUIRED_PASSWORD
    }else if(values.password.length < 6){
        errors.password = CommonConstants.ERRORS.AT_LEAST_6_CHARACTERS
    }
    return errors;
}
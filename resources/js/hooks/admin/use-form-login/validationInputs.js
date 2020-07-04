import CommonConstants from '../../../config/CommonConstants'

export default function validateAuth(values){
    let errors = {}
    //email error
    if(!values.email){
        errors.email = CommonConstants.MSG.ERROR.REQUIRED_EMAIL
    }else if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i.test(values.email)){
        errors.email = CommonConstants.MSG.ERROR.INVALID_EMAIL
    }
    //password error
    if(!values.password){
        errors.password = CommonConstants.MSG.ERROR.REQUIRED_PASSWORD
    }else if(values.password.length < 6){
        errors.password = CommonConstants.MSG.ERROR.AT_LEAST_6_CHARACTERS
    }
    return errors;
}
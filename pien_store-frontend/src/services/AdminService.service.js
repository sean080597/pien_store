import CommonConstants from '../config/CommonConstants'
import ConnectionService from '../services/ConnectionService.service'
import CommonService from '../services/CommonService.service'
import iziToast from 'izitoast'
import {useDispatch} from 'react-redux'

const apiUrl = CommonConstants.API_URL
const regexEmail = new RegExp("^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9]{2,4})$")
const lsPagesManagerment = [
  'category', 'order', 'product', 'user', 'customer'
]

const validateUserInputs = (values) => {
  let errors = {}
  //email error
  if(!values.email){
      errors.email = CommonConstants.MSG.ERROR.REQUIRED_EMAIL
  }else if(!regexEmail.test(values.email)){
      errors.email = CommonConstants.MSG.ERROR.INVALID_EMAIL
  }
  //password error
  if(!values.password){
      errors.password = CommonConstants.MSG.ERROR.REQUIRED_PASSWORD
  }else if(values.password.length < 6){
      errors.password = CommonConstants.MSG.ERROR.AT_LEAST_6_CHARACTERS_SHORT
  }
  return errors;
}

// apply
function applyGetLsObjsManagerment(type, pageIndex = null) {
  if(lsPagesManagerment.indexOf(type) !== -1){
    const apiQuery = `${apiUrl}/${type}/searchData${pageIndex ? '?page=' + pageIndex : ''}`
    return ConnectionService.axiosPostByUrlWithToken(apiQuery, {pageSize: 15})
    .then(res => {
        if(type === 'user'){
            res.data.data.map(item => {
                item.genderName = item.gender === 'M' ? 'Male' : 'Female'
            })
        }
        let result = {'lsObjs': [], 'pagination': {}}
        result.lsObjs = res.data.data
        delete res.data.data
        result.pagination = res.data
        return result
    })
    .catch(res => res)
  }
}

function applyGetAllRoles() {
  const apiQuery = `${apiUrl}/admin-role/getAllData`
  return ConnectionService.axiosGetByUrlWithToken(apiQuery).then(res => res).catch(res => res)
}

const showMessage = (isSuccess, type, action, isShowMsg, msg = null) => {
  if(isSuccess){
      iziToast.success({
          title: 'Success',
          message: `${action} ${type} successfully`,
          position: 'topCenter'
      })
  }
  if(!isSuccess){
      if(isShowMsg){
          iziToast.error({
              title: 'Failed',
              message: msg,
              position: 'topCenter'
          })
      }else{
          iziToast.error({
              title: 'Failed',
              message: 'There was an error!',
              position: 'topCenter'
          })
      }
  }
}

// export
const AdminService = {
  lsPagesManagerment: lsPagesManagerment,
  validateUserInputs: validateUserInputs,
  applyGetLsObjsManagerment: applyGetLsObjsManagerment,
  applyGetAllRoles: applyGetAllRoles,
  showMessage: showMessage
}
export default AdminService
import CommonConstants from '../../../config/CommonConstants'
import { useConnectionService, useCommonService } from '../../HookManager'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import Cookie from 'js-cookie'
import iziToast from 'izitoast'

const apiUrl = CommonConstants.API_URL
const lsPagesManagerment = ['category', 'order', 'product', 'user', 'customer']
const lsOrderStatus = ['CANCELED', 'DELIVERING', 'DELIVERED', 'RECEIVED', 'PENDING', 'PROCESSING']

export default function useAdminService() {
  const CommonService = useCommonService()
  const ConnectionService = useConnectionService()
  const dispatch = useDispatch()
  const history = useHistory()
  const {curPath} = useSelector(state => ({
    curPath: state.common.currentPath
  }))

  function setCookieToken(resJWT) {
    const expiryIn = resJWT.expires_in
    const expiryDate = moment(new Date()).add(expiryIn, 's').toDate()
    // setCookie('token', res.accessToken, { path: '/', httpOnly: true, sameSite: 'lax', expires: expiryDate})
    //set cookie jwt token
    Cookie.set('access_token', resJWT.access_token, { sameSite: 'strict', expires: expiryDate })
  }

  function refreshToken() {
    const apiQuery = `${apiUrl}/user/refresh`
    ConnectionService.axiosPostByUrlWithToken(apiQuery)
    .then(resJWT => {
      if(resJWT.access_token){
        setCookieToken(resJWT)
      }
    })
    .catch(() =>{
      showMessage(false, null, 'Post', true, CommonConstants.ERRORS.OCCURED_ERROR)
    })
  }

  async function login(sendData) {
    let result = {}
    const apiQuery = `${apiUrl}/user/login`
    CommonService.turnOnLoader()
    await ConnectionService.axiosPostByUrl(apiQuery, sendData)
    .then(resJWT => {
      //dispatch
      dispatch({ type: 'LOGIN_ADMIN', payload: resJWT })
      setCookieToken(resJWT)
      history.push('/admin-su')
      result = { 'isSuccess': true }
      // set interval refresh token
      setInterval(() => {
        if(Cookie.get('access_token')) refreshToken()
        else CommonService.goToHome(curPath)
      }, CommonConstants.TOKEN.REFRESH_TIMEOUT);
    })
    .catch(e => {
      result = { 'isSuccess': false, 'message': CommonConstants.ERRORS.WRONG_LOGIN_INFO }
    })
    CommonService.turnOffLoader()
    return result
  }

  async function getLoggedInUser() {
    const apiQuery = `${apiUrl}/admin-user/me`
    CommonService.turnOnLoader()
    await ConnectionService.axiosPostByUrlWithToken(apiQuery)
    .then(res => {
      dispatch({ type: 'SET_AUTH_USER', payload: res })
    })
    .catch(() => {
      showMessage(false, null, 'Post', true, CommonConstants.ERRORS.OCCURED_ERROR)
    })
    CommonService.turnOffLoader()
  }

  function showMessage(isSuccess, type, action, isPassedMsg, msg = null) {
    if (isSuccess) {
      iziToast.success({
        title: 'Success',
        message: `${action} ${type} successfully`,
        position: 'topCenter'
      })
    } else if (isSuccess === false && isPassedMsg) {
      iziToast.error({
        title: 'Failed',
        message: msg,
        position: 'topCenter'
      })
    } else if(!CommonService.hasValueNotNull(isSuccess)){
      iziToast.error({
        title: 'Failed',
        message: 'There was an error!',
        position: 'topCenter'
      })
    }
  }

  function validateUserInputs(values) {
    let errors = {}
    //email error
    if (!values.email) {
      errors.email = CommonConstants.ERRORS.REQUIRED_EMAIL
    } else if (!CommonService.checkRegexEmail(values.email)) {
      errors.email = CommonConstants.ERRORS.INVALID_EMAIL
    }
    //password error
    if (!values.password) {
      errors.password = CommonConstants.ERRORS.REQUIRED_PASSWORD
    } else if (values.password.length < 6) {
      errors.password = CommonConstants.ERROR.E107
    }
    return errors;
  }

  function applyGetLsObjsManagerment(curType, pageIndex = null, pageSize = null, search = null) {
    if (lsPagesManagerment.indexOf(curType) !== -1) {
      const apiQuery = `${apiUrl}/admin-${curType}/searchData${pageIndex ? '?page=' + pageIndex : ''}`
      const sendData = { search: search, pageSize: pageSize ? pageSize : CommonConstants.DEFAULT_ADMIN_PAGESIZE}
      return ConnectionService.axiosPostByUrlWithToken(apiQuery, sendData)
        .then(res => {
          if (curType === 'user') {
            res.data.data.map(item => {
              item.genderName = item.gender === 'M' ? 'Male' : 'Female'
            })
          }
          let result = { 'lsObjs': [], 'pagination': {} }
          result.lsObjs = res.data.data
          delete res.data.data
          result.pagination = res.data
          dispatch({type: 'SET_LIST_OBJECTS_MANAGERMENT', payload: result.lsObjs})
          dispatch({type: 'SET_PAGINATION', payload: result.pagination})
        })
        .catch(res => showMessage(false, curType, 'Get', false, null))
    }
  }

  function applyGetAllRoles() {
    const apiQuery = `${apiUrl}/admin-role/getAllData`
    return ConnectionService.axiosGetByUrlWithToken(apiQuery)
    .then(res => {
      dispatch({type: 'SET_LIST_ROLES', payload: res.data})
      return res
    })
    .catch(res => {
      showMessage(false, null, 'Get', false, null)
      return res
    })
  }

  function applyGetAllCategories() {
    const apiQuery = `${apiUrl}/category/searchData`
    return ConnectionService.axiosPostByUrl(apiQuery)
    .then(res => {
      dispatch({type: 'SET_LIST_CATEGORIES', payload: res.data})
      return res
    })
    .catch(res => {
      showMessage(false, null, 'Get', false, null)
      return res
    })
  }

  function applyGetMeAdmin() {
    const apiQuery = `${apiUrl}/admin-user/me`
    return ConnectionService.axiosPostByUrl(apiQuery).then(res => res).catch(res => res)
  }

  function applyCreateData(curType, sendData){
    const apiQuery = `${apiUrl}/admin-${curType}/createData`
    return ConnectionService.axiosPostByUrlWithToken(apiQuery, sendData)
    .then(res => {
      showMessage(res.success, curType, 'Created', false, null)
      return res
    })
    .catch(res => {
      showMessage(res.success, curType, 'Created', false, null)
      return res
    })
  }

  function applyEditData(curType, sendData, itemId){
    const apiQuery = `${apiUrl}/admin-${curType}/editData/${itemId}`
    return ConnectionService.axiosPutByUrlWithToken(apiQuery, sendData)
    .then(res => {
      showMessage(res.success, curType, 'Edited', false, null)
      return res
    })
    .catch(res => {
      showMessage(res.success, curType, 'Edited', false, null)
      return res
    })
  }

  function applyDeleteData(curType, itemId){
    const apiQuery = `${apiUrl}/admin-${curType}/deleteData/${itemId}`
    return ConnectionService.axiosDeleteByUrlWithToken(apiQuery)
    .then(res => {
      showMessage(res.success, curType, 'Deleted', false, null)
      return res
    })
    .catch(res => {
      showMessage(res.success, curType, 'Edited', false, null)
      return res
    })
  }

  return {
    lsPagesManagerment, lsOrderStatus,
    login, getLoggedInUser, applyGetMeAdmin, validateUserInputs,
    applyGetLsObjsManagerment, applyGetAllRoles, applyGetAllCategories, showMessage,
    applyCreateData, applyEditData, applyDeleteData
  }
}

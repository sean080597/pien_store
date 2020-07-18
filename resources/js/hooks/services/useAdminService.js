import CommonConstants from '../../config/CommonConstants'
import { useConnectionService, useCommonService } from '../HookManager'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import Cookie from 'js-cookie'
import iziToast from 'izitoast'

const apiUrl = CommonConstants.API_URL
const regexEmail = new RegExp("^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9]{2,4})$")
const lsPagesManagerment = [
  'category', 'order', 'product', 'user', 'customer'
]
const lsOrderStatus = ['CANCELED', 'DELIVERING', 'DELIVERED', 'RECEIVED', 'PENDING', 'PROCESSING']

export default function useAdminService() {
  const CommonService = useCommonService()
  const ConnectionService = useConnectionService()
  const dispatch = useDispatch()
  const history = useHistory()
  const {token, curPath} = useSelector(state => ({
    token: state.auth.token,
    curPath: state.common.currentPath
  }))

  function setCookieToken(resJWT) {
    const expiryIn = resJWT.expires_in
    const expiryDate = moment(new Date()).add(expiryIn, 's').toDate()
    // setCookie('token', res.accessToken, { path: '/', httpOnly: true, sameSite: 'lax', expires: expiryDate})
    //set cookie jwt token
    Cookie.set('access_token', resJWT.access_token, { sameSite: 'strict', expires: expiryDate })
  }

  async function refreshToken() {
    const apiQuery = `${apiUrl}/user/refresh`
    CommonService.turnOnLoader()
    await ConnectionService.axiosPostByUrlWithToken(apiQuery)
    .then(resJWT => {
      if(resJWT.access_token){
        setCookieToken(resJWT)
      }
    })
    .catch(() =>{
      showMessage(false, null, 'Post', true, CommonConstants.MSG.ERROR.OCCURED_ERROR)
    })
    CommonService.turnOffLoader()
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
        if(token) refreshToken()
        else CommonService.goToHome(curPath)
      }, CommonConstants.TOKEN.REFRESH_TIMEOUT);
    })
    .catch(e => {
      result = { 'isSuccess': false, 'message': CommonConstants.MSG.ERROR.WRONG_LOGIN_INFO }
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
      showMessage(false, null, 'Post', true, CommonConstants.MSG.ERROR.OCCURED_ERROR)
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
    }
    if (!isSuccess) {
      if (isPassedMsg) {
        iziToast.error({
          title: 'Failed',
          message: msg,
          position: 'topCenter'
        })
      } else {
        iziToast.error({
          title: 'Failed',
          message: 'There was an error!',
          position: 'topCenter'
        })
      }
    }
  }

  function validateUserInputs(values) {
    let errors = {}
    //email error
    if (!values.email) {
      errors.email = CommonConstants.MSG.ERROR.REQUIRED_EMAIL
    } else if (!regexEmail.test(values.email)) {
      errors.email = CommonConstants.MSG.ERROR.INVALID_EMAIL
    }
    //password error
    if (!values.password) {
      errors.password = CommonConstants.MSG.ERROR.REQUIRED_PASSWORD
    } else if (values.password.length < 6) {
      errors.password = CommonConstants.MSG.ERROR.AT_LEAST_6_CHARACTERS_SHORT
    }
    return errors;
  }

  function applyGetLsObjsManagerment(curType, pageIndex = null) {
    if (lsPagesManagerment.indexOf(curType) !== -1) {
      const apiQuery = `${apiUrl}/admin-${curType}/searchData${pageIndex ? '?page=' + pageIndex : ''}`
      return ConnectionService.axiosPostByUrlWithToken(apiQuery, { pageSize: 15 })
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
    .then(res => dispatch({type: 'SET_LIST_ROLES', payload: res.data}))
    .catch(res => showMessage(false, null, 'Get', false, null))
  }

  function applyGetAllCategories() {
    const apiQuery = `${apiUrl}/category/searchData`
    return ConnectionService.axiosPostByUrl(apiQuery)
    .then(res => dispatch({type: 'SET_LIST_CATEGORIES', payload: res.data}))
    .catch(res => showMessage(false, null, 'Get', false, null))
  }

  function applyGetMeAdmin() {
    const apiQuery = `${apiUrl}/admin-user/me`
    return ConnectionService.axiosPostByUrl(apiQuery).then(res => res).catch(res => res)
  }

  return {
    regexEmail, lsPagesManagerment, lsOrderStatus,
    login, getLoggedInUser, applyGetMeAdmin, validateUserInputs,
    applyGetLsObjsManagerment, applyGetAllRoles, applyGetAllCategories, showMessage
  }
}

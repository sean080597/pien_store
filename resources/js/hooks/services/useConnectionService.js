import Cookie from 'js-cookie'
import axios from 'axios'
import {useCommonService} from '../HookManager'
import { useSelector } from 'react-redux'

export default function useConnectionService() {
  const CommonService = useCommonService()
  const {curPath} = useSelector(state => state.common.currentPath)

  const axiosGetByUrl = (urlPath) => {
    console.log('Send GET resquest ==> ', urlPath)
    return axios.get(urlPath)
    .then(response => response.data)
    .catch(error => {
      throw (error);
    })
  }
  const axiosGetByUrlWithToken = (urlPath) => {
    console.log('Send GET resquest with token ==> ', urlPath)
    const apiHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookie.get('access_token')}`
    }
    return axios.get(urlPath, { headers: apiHeaders })
    .then(response => response.data)
    .catch(error => { CommonService.goToHome(curPath) })
  }
  const axiosPostByUrl = (urlPath, sendData = null) => {
    console.log('Send POST resquest ==> ', urlPath)
    return axios.post(urlPath, sendData)
    .then(response => response.data)
    .catch(error => {
      throw (error);
    })
  }
  const axiosPostByUrlWithToken = (urlPath, sendData = null) => {
    console.log('Send POST resquest with token ==> ', urlPath)
    const apiHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookie.get('access_token')}`
    }
    return axios.post(urlPath, sendData, { headers: apiHeaders })
    .then(response => response.data)
    .catch(error => { CommonService.goToHome(curPath) })
  }
  const axiosDeleteByUrlWithToken = (urlPath) => {
    console.log('Send DELETE resquest ==> ', urlPath)
    const apiHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookie.get('access_token')}`
    }
    return axios.delete(urlPath, { headers: apiHeaders })
    .then(response => response.data)
    .catch(error => { CommonService.goToHome(curPath) })
  }
  const axiosPutByUrlWithToken = (urlPath, sendData = null) => {
    console.log('Send PUT resquest with token ==> ', urlPath)
    const apiHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookie.get('access_token')}`
    }
    return axios.put(urlPath, sendData, { headers: apiHeaders })
    .then(response => response.data)
    .catch(error => { CommonService.goToHome(curPath) })
  }

  return { axiosGetByUrl, axiosGetByUrlWithToken, axiosPostByUrl, axiosPostByUrlWithToken, axiosDeleteByUrlWithToken, axiosPutByUrlWithToken }
}

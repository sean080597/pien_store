import Cookie from 'js-cookie'
import axios from 'axios'

export default function useConnectionService() {

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
      .catch(error => {
          throw (error);
      })
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
      .catch(error => {
          throw (error);
      })
  }
  const axiosDeleteByUrlWithToken = (urlPath) => {
      console.log('Send DELETE resquest ==> ', urlPath)
      const apiHeaders = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookie.get('access_token')}`
      }
      return axios.delete(urlPath, { headers: apiHeaders })
      .then(response => response.data)
      .catch(error => {
          throw (error);
      })
  }
  const axiosPutByUrlWithToken = (urlPath, sendData = null) => {
      console.log('Send PUT resquest with token ==> ', urlPath)
      const apiHeaders = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookie.get('access_token')}`
      }
      return axios.put(urlPath, sendData, { headers: apiHeaders })
      .then(response => response.data)
      .catch(error => {
          throw (error);
      })
  }

  return {axiosGetByUrl, axiosGetByUrlWithToken, axiosPostByUrl, axiosPostByUrlWithToken, axiosDeleteByUrlWithToken, axiosPutByUrlWithToken}
}

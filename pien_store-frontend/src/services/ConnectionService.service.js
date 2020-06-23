import CommonService from './CommonService.service'
import Cookie from 'js-cookie'
import axios from 'axios'

const ConnectionService = {
    axiosGetByUrl(urlPath, isShowLoading = true){
        console.log('Send GET resquest ==> ', urlPath)
        if(isShowLoading) CommonService.turnOnLoader()
        return axios.get(urlPath)
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
    axiosGetByUrlWithToken(urlPath, isShowLoading = true){
        console.log('Send GET resquest with token ==> ', urlPath)
        const apiHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('access_token')}`
        }
        if(isShowLoading) CommonService.turnOnLoader()
        return axios.get(urlPath, { headers: apiHeaders })
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
    axiosPostByUrl(urlPath, sendData = null, isShowLoading = true){
        console.log('Send POST resquest ==> ', urlPath)
        if(isShowLoading) CommonService.turnOnLoader()
        return axios.post(urlPath, sendData)
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
    axiosPostByUrlWithToken(urlPath, sendData = null, isShowLoading = true){
        console.log('Send POST resquest with token ==> ', urlPath)
        const apiHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('access_token')}`
        }
        if(isShowLoading) CommonService.turnOnLoader()
        return axios.post(urlPath, sendData, { headers: apiHeaders })
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
    axiosDeleteByUrlWithToken(urlPath, isShowLoading = true){
        console.log('Send DELETE resquest ==> ', urlPath)
        const apiHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('access_token')}`
        }
        if(isShowLoading) CommonService.turnOnLoader()
        return axios.delete(urlPath, { headers: apiHeaders })
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
    axiosPutByUrlWithToken(urlPath, sendData = null, isShowLoading = true){
        console.log('Send PUT resquest with token ==> ', urlPath)
        const apiHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('access_token')}`
        }
        if(isShowLoading) CommonService.turnOnLoader()
        return axios.put(urlPath, sendData, { headers: apiHeaders })
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
};

export default ConnectionService;
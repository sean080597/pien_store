import CommonService from './CommonService.service'
import Cookie from 'js-cookie'
import axios from 'axios'

const ConnectionService = {
    axiosGetByUrl(urlPath){
        CommonService.turnOnLoader()
        return axios.get(urlPath)
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
    axiosGetByUrlWithToken(urlPath){
        const apiHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('access_token')}`
        }
        CommonService.turnOnLoader()
        return axios.get(urlPath, { headers: apiHeaders })
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
    axiosPostByUrl(urlPath, sendData = null){
        CommonService.turnOnLoader()
        return axios.post(urlPath, sendData)
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
    axiosPostByUrlWithToken(urlPath, sendData = null){
        const apiHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('access_token')}`
        }
        CommonService.turnOnLoader()
        return axios.post(urlPath, sendData, { headers: apiHeaders })
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
    axiosDeleteByUrlWithToken(urlPath){
        const apiHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('access_token')}`
        }
        CommonService.turnOnLoader()
        return axios.delete(urlPath, { headers: apiHeaders })
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
    axiosPutByUrlWithToken(urlPath, sendData = null){
        const apiHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookie.get('access_token')}`
        }
        CommonService.turnOnLoader()
        return axios.put(urlPath, sendData, { headers: apiHeaders })
        .then(response => response.data)
        .catch(error => {
            throw (error);
        })
    },
};

export default ConnectionService;
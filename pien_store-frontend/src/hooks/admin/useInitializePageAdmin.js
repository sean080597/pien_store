import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../../config/CommonConstants'
import CommonService from '../../services/CommonService.service'
import ConnectionService from '../../services/ConnectionService.service'
import AdminService from '../../services/AdminService.service'

const apiUrl = CommonConstants.API_URL;

export default function useInitializePageAdmin(curType) {
    const dispatch = useDispatch()
    const {curPath} = useSelector(state => ({
        curPath: state.common.currentPath
    }))
    const [lsRoles, setLsRoles] = useState([])

    // handle
    const handleToken = () => {}

    // apply
    const applyGetLsObjsManagerment = (type) => {
        if(AdminService.lsPagesManagerment.indexOf(type) !== -1){
            const apiQuery = `${apiUrl}/${type}/searchData`
            ConnectionService.axiosPostByUrlWithToken(apiQuery, {pageSize: 15})
            .then(async res => {
                if(type === 'user'){
                    res.data.data.map(item => {
                        item.genderName = item.gender === 'M' ? 'Male' : 'Female'
                    })
                }
                await dispatch({type: 'SET_LIST_OBJECTS_MANAGERMENT', payload: res.data.data})
                CommonService.turnOffLoader()
            })
        }
    }
    const applyGetAllRoles = () => {
        const apiQuery = `${apiUrl}/admin-role/getAllData`
        ConnectionService.axiosGetByUrlWithToken(apiQuery)
        .then(res => {
            setLsRoles(res.data)
        })
    }

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PATH', payload: window.location.pathname})
        dispatch({type: 'SET_FALSE_IS_FIRST_LOADED'})
        if(curPath.indexOf(curType) !== -1){
            applyGetLsObjsManagerment(curType)
        }
        if(curPath.indexOf('user') !== -1){
            applyGetAllRoles()
        }
        return () => {
            if(AdminService.lsPagesManagerment.indexOf(curType) === -1) CommonService.turnOffLoader()
        }
    }, [curPath])
    return {lsRoles};
}

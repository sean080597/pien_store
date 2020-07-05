import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonConstants from '../../config/CommonConstants'
import CommonService from '../../services/CommonService.service'
import ConnectionService from '../../services/ConnectionService.service'
import AdminService from '../../services/AdminService.service'

export default function useInitializePageAdmin(curType) {
    const dispatch = useDispatch()
    const {curPath} = useSelector(state => ({
        curPath: state.common.currentPath
    }))

    // handle
    const handleToken = () => {}

    const getLsObjsManagerment = () => {
        AdminService.applyGetLsObjsManagerment(curType)
        .then(res => {
            dispatch({type: 'SET_LIST_OBJECTS_MANAGERMENT', payload: res.lsObjs})
            dispatch({type: 'SET_PAGINATION', payload: res.pagination})
            CommonService.turnOffLoader()
        })
        .catch(() => AdminService.showMessage(false, curType, 'Get', false, null))
    }

    const getGetAllRoles = async () => {
        AdminService.applyGetAllRoles()
        .then(async res => {
            await dispatch({type: 'SET_LIST_ROLES', payload: res.data})
            CommonService.turnOffLoader()
        })
        .catch(() => AdminService.showMessage(false, curType, 'Get', false, null))
    }

    const getGetAllCategories = async () => {
        AdminService.applyGetAllCategories()
        .then(async res => {
            await dispatch({type: 'SET_LIST_CATEGORIES', payload: res.data})
            CommonService.turnOffLoader()
        })
        .catch(() => AdminService.showMessage(false, curType, 'Get', false, null))
    }

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PATH', payload: window.location.pathname})
        dispatch({type: 'SET_FALSE_IS_FIRST_LOADED'})
        if(curPath.indexOf(curType) !== -1){
            getLsObjsManagerment()
        }
        if(curType && curType.includes('user')){
            getGetAllRoles()
        }
        if(curType && curType.includes('product')){
            getGetAllCategories()
        }
        return () => {
            if(AdminService.lsPagesManagerment.indexOf(curType) === -1) CommonService.turnOffLoader()
        }
    }, [curPath])
    return;
}

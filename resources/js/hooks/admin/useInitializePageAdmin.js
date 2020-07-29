import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useAdminService, useCommonService} from '../HookManager'

export default function useInitializePageAdmin(curType) {
    const CommonService = useCommonService()
    const AdminService = useAdminService()
    const dispatch = useDispatch()
    const {curPath, lsCategories, lsRoles} = useSelector(state => ({
        curPath: state.common.currentPath,
        lsCategories: state.admin.lsCategories,
        lsRoles: state.admin.lsRoles
    }))

    const getLsObjsManagerment = async () => {
        CommonService.turnOnLoader()
        await AdminService.applyGetLsObjsManagerment(curType)
        CommonService.turnOffLoader()
    }

    const getGetAllRoles = async () => {
        CommonService.turnOnLoader()
        await AdminService.applyGetAllRoles()
        CommonService.turnOffLoader()
    }

    const getGetAllCategories = async () => {
        CommonService.turnOnLoader()
        await AdminService.applyGetAllCategories()
        CommonService.turnOffLoader()
    }

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PATH', payload: window.location.pathname})
        dispatch({type: 'SET_FALSE_IS_FIRST_LOADED'})
        if(curPath.indexOf(curType) !== -1){
            getLsObjsManagerment()
        }
        if(curType && curType.includes('user') && lsRoles.length < 0){
            getGetAllRoles()
        }
        if(curType && curType.includes('product') && lsCategories.length < 1){
            getGetAllCategories()
        }
        if(AdminService.lsPagesManagerment.indexOf(curType) === -1) CommonService.turnOffLoader()
        return () => {}
    }, [curPath])
    return;
}

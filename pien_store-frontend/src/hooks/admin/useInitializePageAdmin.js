import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonService from '../../services/CommonService.service'
import CommonConstants from '../../config/CommonConstants'
import ConnectionService from '../../services/ConnectionService.service'

const apiUrl = CommonConstants.API_URL;
const lsPagesManagerment = ['category', 'order', 'product', 'user', 'customer']

export default function useInitializePageAdmin(curType) {
    const dispatch = useDispatch()
    const {curPath} = useSelector(state => ({
        curPath: state.common.currentPath
    }))

    // handle
    const handleToken = () => {}

    // apply
    const applyGetLsObjsManagerment = (type) => {
        if(lsPagesManagerment.indexOf(type) !== -1){
            const apiQuery = `${apiUrl}/${type}/searchData`
            ConnectionService.axiosPostByUrlWithToken(apiQuery, {
                pageSize: 15
            })
            .then(async res => {
                await dispatch({type: 'SET_LIST_OBJECTS_MANAGERMENT', payload: res.data.data})
                CommonService.turnOffLoader()
            })
        }
    }

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PATH', payload: window.location.pathname})
        dispatch({type: 'SET_FALSE_IS_FIRST_LOADED'})
        if(curPath.indexOf(curType) !== -1){
            applyGetLsObjsManagerment(curType)
        }
        return () => {
            if(lsPagesManagerment.indexOf(curType) === -1) CommonService.turnOffLoader()
        }
    }, [curPath])
    return;
}

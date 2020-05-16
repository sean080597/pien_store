import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonService from '../../services/CommonService.service'
import CommonConstants from '../../config/CommonConstants'
import { useHistory } from 'react-router-dom'

export default function useInitializePageAdmin(curComponent) {
    const dispatch = useDispatch()
    const history = useHistory()
    const {curPath, userRole} = useSelector(state => ({
        curPath: state.common.currentPath,
        userRole: state.auth.user.role
    }))

    useEffect(() => {
        if(curComponent !== 'LOGIN'){
            if(userRole !== 'adm') history.push('/')
            return () => {}
        }
    }, [userRole])

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_PATH', payload: window.location.pathname})
        dispatch({type: 'SET_FALSE_IS_FIRST_LOADED'})
        CommonService.goToPosition()
        return () => {
            CommonService.turnOffLoader()
        }
    }, [curPath])
    return;
}

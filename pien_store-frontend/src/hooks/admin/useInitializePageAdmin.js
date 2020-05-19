import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonService from '../../services/CommonService.service'
import CommonConstants from '../../config/CommonConstants'

export default function useInitializePageAdmin(curComponent) {
    const dispatch = useDispatch()
    const {curPath} = useSelector(state => ({
        curPath: state.common.currentPath
    }))

    const handleToken = () => {
        
    }

    useEffect(() => {
        handleToken()
        dispatch({type: 'SET_CURRENT_PATH', payload: window.location.pathname})
        dispatch({type: 'SET_FALSE_IS_FIRST_LOADED'})
        CommonService.goToPosition()
        return () => {
            CommonService.turnOffLoader()
        }
    }, [curPath])
    return;
}

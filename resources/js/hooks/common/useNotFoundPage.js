import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useCommonService, usePageLoadService} from '../../hooks/HookManager'

export default function useNotFoundPage() {
    const CommonService = useCommonService()
    const PageLoadService = usePageLoadService()
    const dispatch = useDispatch()
    const {curPath} = useSelector(state => ({
        curPath: state.common.currentPath
    }))

    useEffect(() => {
        if(!curPath){
            dispatch({type: 'SET_TRUE_IS_NOT_FOUND_PAGE'})
            PageLoadService.buildHomeSection()
            CommonService.turnOffLoader()
        }
        return () => {
            dispatch({type: 'SET_FALSE_IS_NOT_FOUND_PAGE'})
        }
    }, [curPath])
    return;
}

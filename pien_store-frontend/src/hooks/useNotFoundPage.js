import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageLoadService from '../services/PageLoadService.service'

export default function useNotFoundPage() {
    const dispatch = useDispatch()
    const abortController = new AbortController()
    const {curPath} = useSelector(state => ({
        curPath: state.common.currentPath
    }))

    useEffect(() => {
        if(!curPath){
            dispatch({type: 'SET_TRUE_IS_NOT_FOUND_PAGE'})
            PageLoadService.buildHomeSection()
        }
        return () => {
            dispatch({type: 'SET_FALSE_IS_NOT_FOUND_PAGE'})
            abortController.abort()
        }
    }, [curPath])
    return;
}

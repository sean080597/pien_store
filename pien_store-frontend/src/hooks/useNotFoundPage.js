import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function useNotFoundPage() {
    const dispatch = useDispatch()
    const abortController = new AbortController()

    useEffect(() => {
        dispatch({type: 'SET_TRUE_IS_NOT_FOUND_PAGE'})
        return () => {
            dispatch({type: 'SET_FALSE_IS_NOT_FOUND_PAGE'})
            abortController.abort()
        }
    }, [])
    return;
}

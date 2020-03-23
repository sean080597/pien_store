/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

export default function useNotFoundPage(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({type: 'SET_FALSE_IS_FIRST_LOADED'})

        return () => {}
    }, [])

    return;
}
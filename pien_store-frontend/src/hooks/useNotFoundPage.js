/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import PageLoadService from "../services/PageLoadService.service";
import CommonService from '../services/CommonService.service'

export default function useNotFoundPage(){
    const dispatch = useDispatch()

    useEffect(()=>{
        CommonService.turnOffLoader()
        dispatch({type: 'SET_TRUE_IS_NOT_FOUND_PAGE'})
        //cuz reload page when redirecting to NotFound page
        PageLoadService.buildHomeSection()

        return () => {
            dispatch({type: 'SET_FALSE_IS_NOT_FOUND_PAGE'})
            CommonService.turnOnLoader()
        }
    }, [])

    return;
}
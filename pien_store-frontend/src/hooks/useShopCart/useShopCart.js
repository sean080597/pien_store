/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import PageLoadService from "../services/PageLoadService.service";
import CommonService from '../services/CommonService.service'

export default function useShopCart(){
    const dispatch = useDispatch()

    useEffect(()=>{

        return () => {
            dispatch({type: 'SET_PRODUCTS'})
            dispatch({type: 'SET_FILTERED_PRODUCTS'})
        }
    }, [])

    return;
}
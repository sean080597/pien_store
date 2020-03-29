import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import CommonService from '../services/CommonService.service'
import {usePromiseTracker} from 'react-promise-tracker'

export default function useTurnOnOffLoader() {
    const dispatch = useDispatch()
    // const { promiseInProgress } = usePromiseTracker({delay: 500})

    useEffect(() => {
        dispatch({type: 'SET_PAYLOAD_DIRECTLY', payload: window.location.pathname})
        dispatch({type: 'SET_FALSE_IS_FIRST_LOADED'})
        // if(promiseInProgress){
        //     CommonService.turnOffLoader()
        // }
        return () => {
            // CommonService.turnOnLoader()
        }
    }, [])
    return;
}

import {useEffect} from 'react'
import {useCookies} from 'react-cookie'

export default function useCookie(){
    const [cookies, setCookie, removeCookie] = useCookies([]);

    useEffect(()=>{

        return () => {
            
        }
    }, [])

    return {cookies, setCookie, removeCookie};
}
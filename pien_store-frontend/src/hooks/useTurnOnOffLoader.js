import { useEffect } from 'react'
import CommonService from '../services/CommonService.service';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux'

export default function useTurnOnOffLoader() {
    const [cookies] = useCookies();
    const isFirstLoaded = useSelector(state => state.isFirstLoadPage)
    useEffect(() => {
        if((isFirstLoaded && !cookies.access_token) || !isFirstLoaded){
            console.log('not fist loaded', !isFirstLoaded)
            console.log(isFirstLoaded && !cookies.access_token)
            CommonService.turnOffLoader()
        }
        return () => {
            CommonService.turnOnLoader()
        }
    }, [])
    return;
}

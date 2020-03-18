import { useEffect } from 'react'
import CommonService from '../services/CommonService.service';

export default function useTurnOnOffLoader() {
    useEffect(() => {
        CommonService.turnOffLoader()

        return () => {
            CommonService.turnOnLoader()
        }
    }, [])
    return;
}

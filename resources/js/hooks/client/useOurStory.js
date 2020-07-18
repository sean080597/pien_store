import { useState, useEffect } from 'react'
import CommonConstants from '../../config/CommonConstants'
import {useConnectionService, useCommonService} from '../HookManager'

const apiUrl = CommonConstants.API_URL;

export default function useOurStory() {
  const CommonService = useCommonService()
  const ConnectionService = useConnectionService()
  const [lsStories, setLsStories] = useState([])

  //handle
  
  // apply
  const applyGetOurStories = async () => {
    const apiQuery = `${apiUrl}/our-stories/getData`
    CommonService.turnOnLoader()
    await ConnectionService.axiosGetByUrl(apiQuery)
    .then(res => {
      if(res.success){
        setLsStories(res.data)
      }
    })
    CommonService.turnOffLoader()
  }

  useEffect(() => {
    applyGetOurStories()
    return () => {}
  }, [])
  return { lsStories }
}

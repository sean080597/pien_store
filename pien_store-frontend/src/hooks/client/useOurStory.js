import { useState, useEffect } from 'react'
import ConnectionService from '../../services/ConnectionService.service'
import CommonConstants from '../../config/CommonConstants'
import CommonService from '../../services/CommonService.service';

const apiUrl = CommonConstants.API_URL;

export default function useOurStory() {
  const [lsStories, setLsStories] = useState([])

  //handle
  
  // apply
  const applyGetOurStories = () => {
    const apiQuery = `${apiUrl}/our-stories/getData`
    ConnectionService.axiosGetByUrl(apiQuery)
    .then(res => {
      if(res.success){
        setLsStories(res.data)
        CommonService.turnOffLoader()
      }
    })
  }

  useEffect(() => {
    applyGetOurStories()
    return () => {}
  }, [])
  return { lsStories }
}

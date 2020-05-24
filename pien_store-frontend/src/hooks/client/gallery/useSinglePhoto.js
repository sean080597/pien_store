import { useState, useEffect, useRef } from 'react'
import CommonService from '../../../services/CommonService.service'

export default function useSinglePhoto(initial, refImage) {
  const [userInputs, setUserInputs] = useState(initial)
  const isMountedRef = useRef(false)

  //handle
  const handleScroll = () => {
    if (!userInputs.isLoaded && CommonService.isElementInViewport(refImage.current)) {
      // Load real image
      const imgLoader = new Image();
      imgLoader.src = userInputs.imgSrc;
      imgLoader.onload = () => {
        if (CommonService.hasValueNotNull(refImage.current)) {
          refImage.current.setAttribute(
            `src`,
            `${userInputs.imgSrc}`
          );
        }

        setUserInputs({ ...userInputs, isLoaded: true })
      }
    }
  }

  useEffect(() => {
    window.addEventListener('load', handleScroll);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('load', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])
  return { userInputs }
}

import { useState, useEffect } from 'react'
import Bound from 'bounds.js'

export default function useSinglePhoto(initial, refImage) {
  const [userInputs, setUserInputs] = useState(initial)
  const boundary = Bound({
    margins: { bottom: 100 }
  })

  //handle
  const handleScroll = () => {
    if (!userInputs.isLoaded) {
      boundary.watch(refImage.current, () => whenImageEnters(refImage.current))
    }
  }

  const whenImageEnters = (lazyImage) => {
    lazyImage.src = userInputs.imgSrc
    lazyImage.classList.add('reveal')
    boundary.unWatch(lazyImage)
    setUserInputs({ ...userInputs, isLoaded: true })
  }

  const whenImageLeaves = (lazyImage) => {
    lazyImage.classList.remove('reveal')
  }

  useEffect(() => {
    handleScroll()
    return () => {}
  }, [])
  return { userInputs }
}

import React, { useState, useEffect, useRef } from "react";
import CommonConstants from '../../config/CommonConstants'
import Bound from 'bounds.js'

const placeholder = CommonConstants.IMAGES_DIR + '/placeholder.png'

export default function LazyLoadingImage(props) {
  const [userInputs, setUserInputs] = useState({ isLoaded: false, imgSrc: props.src || placeholder })
  const refImage = useRef(null)
  const boundary = Bound({
    margins: { bottom: 100 }
  })

  //handle
  const handleLazyLoading = () => {
    console.log('call handleLazyLoading ==> ', userInputs.isLoaded)
    if (!userInputs.isLoaded) {
      boundary.watch(refImage.current, () => whenImageEnters(refImage.current))
    }
  }

  const whenImageEnters = (lazyImage) => {
    console.log('call WhenImageEnters ==> ', userInputs, ' - props ==> ', props)
    lazyImage.src = userInputs.imgSrc
    lazyImage.classList.add('reveal')
    boundary.unWatch(lazyImage)
    setUserInputs({ ...userInputs, isLoaded: true })
  }

  const whenImageLeaves = (lazyImage) => {
    lazyImage.classList.remove('reveal')
  }

  useEffect(() => {
    handleLazyLoading()
    console.log('call useEffect lazyLoadingImg')
    return () => {}
  }, [])

  return (
    <img alt={props.alt} ref={refImage}/>
  );
};

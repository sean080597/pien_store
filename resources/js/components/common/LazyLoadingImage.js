import React, { useState, useEffect, useRef } from "react";
import CommonConstants from '../../config/CommonConstants'
import Bound from 'bounds.js'

const placeholder = CommonConstants.IMAGES_DIR + '/placeholder.png'

export default function LazyLoadingImage({src, alt, imgName, handleClick}) {
  const imgSrc = src || placeholder
  const refImage = useRef(null)
  const boundary = Bound({
    margins: { bottom: 100 }
  })

  //handle
  const handleLazyLoading = () => {
    boundary.watch(refImage.current, () => whenImageEnters(refImage.current))
  }

  const whenImageEnters = (lazyImage) => {
    lazyImage.src = imgSrc
    lazyImage.classList.add('reveal')
    boundary.unWatch(lazyImage)
  }

  const whenImageLeaves = (lazyImage) => {
    lazyImage.classList.remove('reveal')
  }

  useEffect(() => {
    handleLazyLoading()
    return () => {}
  }, [imgSrc])

  return (
    <img alt={alt} ref={refImage} onClick={() => handleClick(imgName)}/>
  );
};

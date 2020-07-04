import React, { useRef } from "react";
import { useSinglePhoto } from '../../hooks/HookManager'
import CommonConstants from '../../config/CommonConstants'

const placeholder = CommonConstants.IMAGES_DIR + '/placeholder.png'

export default function LazyLoadingImage(props) {
  const INITIAL = { isLoaded: false, imgSrc: props.src || placeholder }
  const refImage = useRef(null)
  useSinglePhoto(INITIAL, refImage)

  return (
    <img alt={props.alt} ref={refImage}/>
  );
};

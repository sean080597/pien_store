import React, {useRef} from "react";
import {useSinglePhoto} from '../../hooks/HookManager'
import CommonConstants from '../../config/CommonConstants'

const imgWithClick = { cursor: "pointer" };
const placeholder = CommonConstants.IMAGES_DIR + '/placeholder.png'

export default function Photo ({ index, onClick, photo, margin, direction, top, left }) {
  const INITIAL = {isLoaded: false, imgSrc: photo.src || placeholder}
  const refImage = useRef(null);
  const {userInputs} = useSinglePhoto(INITIAL, refImage)

  const imgStyle = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = event => {
    onClick(event, { photo, index });
  };

  return (
      <div className="gallery-single-photo">
        <h5 style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
            className="font-alt text-center gallery-single-photo__title">{photo.title}</h5>
        <img
            // {...photo}
            style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            onClick={onClick ? handleClick : null}
            ref={refImage}
        />
      </div>
  );
};

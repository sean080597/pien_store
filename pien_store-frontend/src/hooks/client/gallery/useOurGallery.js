import { useState, useEffect } from 'react'
import ConnectionService from '../../../services/ConnectionService.service'
import CommonConstants from '../../../config/CommonConstants'
import CommonService from '../../../services/CommonService.service'
import { useSelector, useDispatch } from 'react-redux'

const apiUrl = CommonConstants.API_URL;

export default function useOurGallery() {
  const dispatch = useDispatch()
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const {lsPhotos, posLsPhotos} = useSelector(state => ({
    lsPhotos: state.gallery.lsPhotos,
    posLsPhotos: state.gallery.continuousPos
  }))
  const defaultQuantity = 15

  // handle
  const openLightbox = (event, { photo, index }) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }

  const closeLightbox = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  // apply
  const applyGetLsPhotoGallery = (size, pos) => {
    const apiQuery = `${apiUrl}/image-gallery/getData/${size}/${pos}`
    ConnectionService.axiosGetByUrl(apiQuery)
    .then(async res => {
      if(res.success){
        const newLsPhotos = [...lsPhotos, ...res.data]
        await dispatch({type: 'SET_LIST_GALLERY_PHOTOS', payload: newLsPhotos})
        await dispatch({type: 'SET_CONTINUOUS_POS', payload: posLsPhotos + defaultQuantity})
        CommonService.turnOffLoader()
      }
    })
  }

  useEffect(() => {
    applyGetLsPhotoGallery(defaultQuantity, posLsPhotos)
    return () => {}
  }, [])
  return { currentImage, isViewerOpen, openLightbox, closeLightbox }
}

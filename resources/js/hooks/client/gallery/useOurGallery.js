import { useState, useEffect } from 'react'
import CommonConstants from '../../../config/CommonConstants'
import { useSelector, useDispatch } from 'react-redux'
import {useConnectionService, useCommonService} from '../../HookManager'
import $ from 'jquery'
import Bound from 'bounds.js'

const apiUrl = CommonConstants.API_URL;

export default function useOurGallery() {
  const CommonService = useCommonService()
  const ConnectionService = useConnectionService()
  const dispatch = useDispatch()
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const {lsPhotos, continuousPos} = useSelector(state => ({
    lsPhotos: state.gallery.lsPhotos,
    continuousPos: state.gallery.continuousPos
  }))
  const defaultQuantity = 10
  const boundary = Bound({
    margins: { bottom: 100 }
  })

  // handle
  const openLightbox = (event, { photo, index }) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }

  const closeLightbox = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  const handleGetPhotoGallery = () => {
    boundary.watch(document.querySelector('#bottom-loading-component'), () => whenBottomLoadingEnters())
  }

  const whenBottomLoadingEnters = () => {
    applyGetLsPhotoGallery(defaultQuantity, continuousPos)
    boundary.unWatch(document.querySelector('#bottom-loading-component'))
  }

  // apply
  const applyGetLsPhotoGallery = async (size, pos) => {
    const apiQuery = `${apiUrl}/image-gallery/getData/${size}/${pos}`
    CommonService.turnOnLoader()
    await ConnectionService.axiosGetByUrl(apiQuery, false)
    .then(res => {
      if(res.success){
        const newLsPhotos = [...lsPhotos, ...res.data]
        dispatch({type: 'SET_LIST_GALLERY_PHOTOS', payload: newLsPhotos})
        dispatch({type: 'SET_CONTINUOUS_POS', payload: newLsPhotos.length})
        if(res.count === newLsPhotos.length) $('#bottom-loading-component').hide()
      }
    })
    CommonService.turnOffLoader()
  }

  useEffect(() => {
    CommonService.turnOffLoader()
    handleGetPhotoGallery()
    return () => {}
  }, [continuousPos])
  return { currentImage, isViewerOpen, openLightbox, closeLightbox }
}

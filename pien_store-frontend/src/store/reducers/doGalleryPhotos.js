const doGalleryPhotos = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_LIST_GALLERY_PHOTOS':
      return { ...state, lsPhotos: payload }
    case 'SET_CONTINUOUS_POS':
      return { ...state, continuousPos: payload }
    default:
      return state
  }
}
export default doGalleryPhotos
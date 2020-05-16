import { useState } from 'react'

export default function useOurGallery() {
    const [currentImage, setCurrentImage] = useState(0)
    const [viewerIsOpen, setViewerIsOpen] = useState(false)

    const openLightbox = (event, { photo, index }) => {
        setCurrentImage(index)
        setViewerIsOpen(true)
    }

    const closeLightbox = () => {
        setCurrentImage(0)
        setViewerIsOpen(false)
    }
    return {currentImage, viewerIsOpen, openLightbox, closeLightbox}
}

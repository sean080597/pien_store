import React, {useState} from 'react'
import {useTurnOnOffLoader} from '../hooks/HookManager'
import CommonConstants from '../config/CommonConstants'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import SinglePhoto from '../components/gallery/SinglePhoto'
import lsPhotos from '../components/gallery/lsPhotos'
import {useOurGallery} from '../hooks/HookManager'

export default function OurGallery(props) {
    useTurnOnOffLoader()
    const {currentImage, viewerIsOpen, openLightbox, closeLightbox} = useOurGallery()

    return (
        <div className="main">
            <section className="bg-dark-30 showcase-page-header module parallax-bg" style={{backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.HOME_BG})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <h2 className="titan-title-size-4 font-alt text-center">Gallery</h2>
                            <div className="module-subtitle font-serif">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-0 pt-50">
                <div className="container-fluid">
                    <Gallery photos={lsPhotos} direction={"column"} columns={5} margin={8}
                        onClick={openLightbox}
                        renderImage={props => <SinglePhoto {...props}/>}
                    />
                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={lsPhotos.map(x => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.title
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </div>
            </section>
        </div>
    )
}

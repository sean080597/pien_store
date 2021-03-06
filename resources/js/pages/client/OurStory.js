import React from 'react'
import {useTurnOnOffLoader, useOurStory, useCommonService} from '../../hooks/HookManager'
import CommonConstants from '../../config/CommonConstants'
import {LazyLoadingImage} from '../../components/ComponentsManager'

export default function OurStory(props) {
    const CommonService = useCommonService()
    useTurnOnOffLoader()
    const {lsStories} = useOurStory()
    return (
        <div className="main">
            <section className="bg-dark-30 showcase-page-header module parallax-bg" style={{backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.HOME_BG})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <h2 className="titan-title-size-4 font-alt text-center">Our Story</h2>
                            <div className="module-subtitle font-serif">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</div>
                        </div>
                    </div>
                </div>
            </section>
            {lsStories.length > 0 &&
            <section className="pb-0 pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <LazyLoadingImage src={CommonService.generateImageSrc('stories', lsStories[0])} />
                        </div>                
                        <div className="col-sm-offset-1 col-sm-6 story-container main-story">
                            <h4 className="font-alt m-0 text-center"><strong>{lsStories[0].title}</strong></h4>
                            <p>{lsStories[0].description}</p>
                            <a href="#" className="btn btn-circle btn-d" type="button">Read more <i className="fa fa-chevron-circle-right"></i></a>
                        </div>
                    </div>
                    <div className="row">
                    
                        <div className="col-xs-12 col-sm-4">
                        <div className="story-container mt-20 flex-display jus-center">
                            <LazyLoadingImage src={CommonService.generateImageSrc('stories', lsStories[1])} />
                            <h4 className="font-alt m-0 mt-20"><strong>{lsStories[1].title}</strong></h4>
                            <p>{lsStories[1].description}</p>
                            <a href="#" className="btn btn-circle btn-d" type="button">Read more <i className="fa fa-chevron-circle-right"></i></a>
                        </div>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                        <div className="story-container mt-20 flex-display jus-center">
                            <LazyLoadingImage src={CommonService.generateImageSrc('stories', lsStories[2])} />
                            <h4 className="font-alt m-0 mt-20"><strong>{lsStories[2].title}</strong></h4>
                            <p>{lsStories[2].description}</p>
                            <a href="#" className="btn btn-circle btn-d" type="button">Read more <i className="fa fa-chevron-circle-right"></i></a>
                        </div>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                        <div className="story-container mt-20 flex-display jus-center">
                            <LazyLoadingImage src={CommonService.generateImageSrc('stories', lsStories[3])} />
                            <h4 className="font-alt m-0 mt-20"><strong>{lsStories[3].title}</strong></h4>
                            <p>{lsStories[3].description}</p>
                            <a href="#" className="btn btn-circle btn-d" type="button">Read more <i className="fa fa-chevron-circle-right"></i></a>
                        </div>
                        </div>
                   
                    </div>
                  
                </div>
            </section>
            }
        </div>
    )
}

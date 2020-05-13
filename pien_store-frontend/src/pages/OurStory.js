import React from 'react'
import {useTurnOnOffLoader} from '../hooks/HookManager'
import CommonConstants from '../config/CommonConstants'

export default function OurStory(props) {
    useTurnOnOffLoader()
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
            <section className="pb-0 pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <img src="https://images.ctfassets.net/00i767ygo3tc/2uG03zy1JOqRA1Avv0m2RF/322c69b49fa975772b98b77679cebfd8/instagram-story-highlight-cover.jpg" alt="story image" />
                        </div>
                        <div className="col-sm-offset-1 col-sm-6 story-container">
                            <h4 className="font-alt m-0 text-right"><strong>Story 2</strong></h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <a href="#" className="btn btn-circle btn-d pull-right" type="button">Read more <i className="fa fa-chevron-circle-right"></i></a>
                        </div>
                    </div>
                    <div className="story-container--card mt-40">
                        <div className="story-container mt-20 flex-display jus-center">
                            <img src="https://images.ctfassets.net/00i767ygo3tc/2uG03zy1JOqRA1Avv0m2RF/322c69b49fa975772b98b77679cebfd8/instagram-story-highlight-cover.jpg" alt="story image" />
                            <h4 className="font-alt m-0 mt-20"><strong>Story 2</strong></h4>
                            <p>Lorem Ipsum is simply dummy e the ecimen book. It ha remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <a href="#" className="btn btn-circle btn-d" type="button">Read more <i className="fa fa-chevron-circle-right"></i></a>
                        </div>
                        <div className="story-container mt-20 flex-display jus-center">
                            <img src="https://images.ctfassets.net/00i767ygo3tc/2uG03zy1JOqRA1Avv0m2RF/322c69b49fa975772b98b77679cebfd8/instagram-story-highlight-cover.jpg" alt="story image" />
                            <h4 className="font-alt m-0 mt-20"><strong>Story 2</strong></h4>
                            <p>Lorem Ipsum is simply dummy e the ecimen book. It ha remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <a href="#" className="btn btn-circle btn-d" type="button">Read more <i className="fa fa-chevron-circle-right"></i></a>
                        </div>
                        <div className="story-container mt-20 flex-display jus-center">
                            <img src="https://images.ctfassets.net/00i767ygo3tc/2uG03zy1JOqRA1Avv0m2RF/322c69b49fa975772b98b77679cebfd8/instagram-story-highlight-cover.jpg" alt="story image" />
                            <h4 className="font-alt m-0 mt-20"><strong>Story 2</strong></h4>
                            <p>Lorem Ipsum is simply dummy e the ecimen book. It ha remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <a href="#" className="btn btn-circle btn-d" type="button">Read more <i className="fa fa-chevron-circle-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

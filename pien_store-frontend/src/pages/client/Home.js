import React from 'react'
import {Link} from 'react-router-dom'
import CommonConstants from '../../config/CommonConstants'
import CommonService from '../../services/CommonService.service'
import {useShopCart, useTurnOnOffLoader} from '../../hooks/HookManager'
import {NewProduct} from '../../components/ComponentsManager'
import { useSelector } from 'react-redux';

export default function Home(props) {
    useTurnOnOffLoader()
    useShopCart({}, 'HOME_COMPONENT')
    //state
    const {categories} = useSelector(state => ({
        categories: state.shop.categories
    }))

    return (
        <>
            <section className="bg-dark-30 showcase-page-header module parallax-bg" style={{backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.HOME_BG})`}}>
                <div className="titan-caption">
                    <div className="caption-content">
                        <div className="font-alt mb-30 titan-title-size-1">Powerful. Multipurpose.</div>
                        <div className="font-alt mb-40 titan-title-size-4">100+ Layouts</div><a className="section-scroll btn btn-border-w btn-round" href="#category">See Demos</a>
                    </div>
                </div>
            </section>
            <div className="main showcase-page">
                <NewProduct/>
                <section>
                    <Link to="/ourStory"><h1 className="font-alt mb-20 mt-50 text-center"><strong>Our Story</strong></h1></Link>
                    <div className="module-small pb-0 pt-30">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6 story-container">
                                    <h4 className="font-alt m-0"><strong>Story 1</strong></h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
                                <div className="col-sm-5 col-sm-offset-1">
                                    <img src="https://images.ctfassets.net/00i767ygo3tc/2uG03zy1JOqRA1Avv0m2RF/322c69b49fa975772b98b77679cebfd8/instagram-story-highlight-cover.jpg" alt="story image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="module-small pb-0 pt-30">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-5">
                                    <img src="https://images.ctfassets.net/00i767ygo3tc/2uG03zy1JOqRA1Avv0m2RF/322c69b49fa975772b98b77679cebfd8/instagram-story-highlight-cover.jpg" alt="story image" />
                                </div>
                                <div className="col-sm-offset-1 col-sm-6 story-container">
                                    <h4 className="font-alt m-0 text-right"><strong>Story 2</strong></h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-0 mt-50" id="category">
                    <div className="container">
                        <div className="row">
                            <h1 className="font-alt m-0 text-center"><strong>Category</strong></h1>
                        {
                            categories.map((cate, index) =>
                                <div className="col-md-4 col-sm-6 col-xs-12" key={index}>
                                    <Link className="content-box" to={{ pathname: '/shop', state: { cate_id: cate.id } }}>
                                        <div className="content-box-image">
                                            <img src={CommonService.generateImageSrc(true, 'categories', cate)} alt={cate.name} />
                                        </div>
                                        <h3 className="content-box-title font-serif">{cate.name}</h3>
                                    </Link>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

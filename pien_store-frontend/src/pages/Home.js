import React from 'react'
import CommonService from '../services/CommonService.service';
import CommonConstants from '../config/CommonConstants'
import {useShopCart, useTurnOnOffLoader} from '../hooks/HookManager'
import NewProduct from '../components/NewProduct'
import { useSelector } from 'react-redux';

export default function Home(props) {
    useTurnOnOffLoader()
    useShopCart({}, 'HOME_COMPONENT')
    //state
    const {categories} = useSelector(state => ({
        categories: state.shop.categories
    }))

    return (
        <div>
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
                <section className="module-medium" id="category">
                    <div className="container">
                        <div className="row multi-columns-row">
                        {
                            categories.map((cate, index) =>
                                <div className="col-md-4 col-sm-6 col-xs-12" key={index}>
                                    <a className="content-box" href="index_mp_fullscreen_video_background.html">
                                        <div className="content-box-image">
                                            <img src={process.env.PUBLIC_URL + CommonConstants.CATEGORIES_DIR + "/" + (cate.image ? cate.image : CommonConstants.CATEGORY_DEFAULT_IMAGE)} alt={cate.name} />
                                        </div>
                                        <h3 className="content-box-title font-serif">{cate.name}</h3>
                                    </a>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </section>
                <NewProduct/>
            </div>
        </div>
    )
}

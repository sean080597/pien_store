import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div className="main-content">
                <section className="bg-dark-30 showcase-page-header module parallax-bg" data-background="assets/images/showcase_bg.jpg">
                    <div className="titan-caption">
                        <div className="caption-content">
                            <div className="font-alt mb-30 titan-title-size-1">Powerful. Multipurpose.</div>
                            <div className="font-alt mb-40 titan-title-size-4">100+ Layouts</div><a className="section-scroll btn btn-border-w btn-round" href="#demos">See Demos</a>
                        </div>
                    </div>
                </section>
                <div className="main showcase-page">
                    <section className="module-extra-small bg-dark">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6 col-md-8 col-lg-9">
                                    <div className="callout-text font-alt">
                                        <h4 style={{marginTop: '0px'}}>Start Creating Beautiful Websites</h4>
                                        <p style={{marginBottom: '0px'}}>Download Titan Free today!</p>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <div className="callout-btn-box"><a className="btn btn-border-w btn-circle" href="https://themewagon.com/themes/titan/">Downlaod Free</a></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="module-medium" id="demos">
                        <div className="container">
                            <div className="row multi-columns-row">
                                <div className="col-md-4 col-sm-6 col-xs-12"><a className="content-box" href="index_mp_fullscreen_video_background.html">
                                    <div className="content-box-image"><img src="assets/images/category/main_demo.jpg" alt="Main Demo" /></div>
                                    <h3 className="content-box-title font-serif">Main Demo</h3></a></div>
                                <div className="col-md-4 col-sm-6 col-xs-12"><a className="content-box" href="index_agency.html">
                                    <div className="content-box-image"><img src="assets/images/category/agency.jpg" alt="Agency" /></div>
                                    <h3 className="content-box-title font-serif">Agency</h3></a></div>
                                <div className="col-md-4 col-sm-6 col-xs-12"><a className="content-box" href="index_portfolio.html">
                                    <div className="content-box-image"><img src="assets/images/category/portfolio.jpg" alt="Portfolio" /></div>
                                    <h3 className="content-box-title font-serif">Portfolio</h3></a></div>
                                <div className="col-md-4 col-sm-6 col-xs-12"><a className="content-box" href="index_restaurant.html">
                                    <div className="content-box-image"><img src="assets/images/category/restaurant.jpg" alt="Restaurant" /></div>
                                    <h3 className="content-box-title font-serif">Restaurant</h3></a></div>
                                <div className="col-md-4 col-sm-6 col-xs-12"><a className="content-box" href="index_finance.html">
                                    <div className="content-box-image"><img src="assets/images/category/finance.jpg" alt="Finance" /></div>
                                    <h3 className="content-box-title font-serif">Finance</h3></a></div>
                                <div className="col-md-4 col-sm-6 col-xs-12"><a className="content-box" href="index_landing.html">
                                    <div className="content-box-image"><img src="assets/images/category/landing.jpg" alt="Landing" /></div>
                                    <h3 className="content-box-title font-serif">Landing</h3></a></div>
                                <div className="col-md-4 col-sm-6 col-xs-12"><a className="content-box" href="index_photography.html">
                                    <div className="content-box-image"><img src="assets/images/category/photography.jpg" alt="Photography" /></div>
                                    <h3 className="content-box-title font-serif">Photography</h3></a></div>
                                <div className="col-md-4 col-sm-6 col-xs-12"><a className="content-box" href="index_shop.html">
                                    <div className="content-box-image"><img src="assets/images/category/shop.jpg" alt="Shop" /></div>
                                    <h3 className="content-box-title font-serif">Shop</h3></a></div>
                                <div className="col-md-4 col-sm-6 col-xs-12"><a className="content-box" href="index_op_fullscreen_gradient_overlay.html">
                                    <div className="content-box-image"><img src="assets/images/category/one_page.jpg" alt="One Page" /></div>
                                    <h3 className="content-box-title font-serif">One Page</h3></a></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

import React from 'react'
import {useSelector} from 'react-redux'
import CommonConstants from '../config/CommonConstants'

export default function Footer(props) {
    const isNotFoundPage = useSelector(state => state.isNotFoundPage)
    return (
        <>
            {!isNotFoundPage && <>
                <div className="module-small bg-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="widget">
                                    <h5 className="widget-title font-alt">About Titan</h5>
                                    <p>The languages only differ in their grammar, their pronunciation and their most common words.</p>
                                    <p>Phone: +1 234 567 89 10</p>Fax: +1 234 567 89 10
                                    <p>Email:<a href="#">somecompany@example.com</a></p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="widget">
                                    <h5 className="widget-title font-alt">Recent Comments</h5>
                                    <ul className="icon-list">
                                        <li>Maria on <a href="#">Designer Desk Essentials</a></li>
                                        <li>John on <a href="#">Realistic Business Card Mockup</a></li>
                                        <li>Andy on <a href="#">Eco bag Mockup</a></li>
                                        <li>Jack on <a href="#">Bottle Mockup</a></li>
                                        <li>Mark on <a href="#">Our trip to the Alps</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="widget">
                                    <h5 className="widget-title font-alt">Blog Categories</h5>
                                    <ul className="icon-list">
                                        <li><a href="#">Photography - 7</a></li>
                                        <li><a href="#">Web Design - 3</a></li>
                                        <li><a href="#">Illustration - 12</a></li>
                                        <li><a href="#">Marketing - 1</a></li>
                                        <li><a href="#">Wordpress - 16</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="widget">
                                    <h5 className="widget-title font-alt">Popular Posts</h5>
                                    <ul className="widget-posts">
                                        <li className="clearfix">
                                            <div className="widget-posts-image">
                                                <a href="#"><img src={process.env.PUBLIC_URL + CommonConstants.IMAGES_DIR + "/popular_post_1.jpg"} alt="Post Thumbnail" /></a>
                                            </div>
                                            <div className="widget-posts-body">
                                                <div className="widget-posts-title"><a href="#">Designer Desk Essentials</a></div>
                                                <div className="widget-posts-meta">23 january</div>
                                            </div>
                                        </li>
                                        <li className="clearfix">
                                            <div className="widget-posts-image">
                                                <a href="#"><img src={process.env.PUBLIC_URL + CommonConstants.IMAGES_DIR + "/popular_post_1.jpg"} alt="Post Thumbnail" /></a>
                                            </div>
                                            <div className="widget-posts-body">
                                                <div className="widget-posts-title"><a href="#">Realistic Business Card Mockup</a></div>
                                                <div className="widget-posts-meta">15 February</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="divider-d" />
                <footer className="footer bg-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <p className="copyright font-alt">&copy; 2017&nbsp;<a href="index.html">TitaN</a>, All Rights Reserved</p>
                            </div>
                            <div className="col-sm-6">
                                <div className="footer-social-links"><a href="#"><i className="fa fa-facebook"></i></a><a href="#"><i className="fa fa-twitter"></i></a><a href="#"><i className="fa fa-dribbble"></i></a><a href="#"><i className="fa fa-skype"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </>}
        </>
    )
}
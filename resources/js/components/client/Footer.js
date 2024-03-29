import React from 'react'
import {useSelector} from 'react-redux'
import CommonConstants from '../../config/CommonConstants'

export default function Footer(props) {
    const {isNotFoundPage} = useSelector(state => ({
        isNotFoundPage: state.common.isNotFoundPage
    }))
    return (
        <>
            {!isNotFoundPage &&
            <>
                <div className="bg-dark pt-30 pb-0 mt-50">
                    <div className="container">
                        <div className="row pb-4 flex-display">
                            <div className="col-xs-12 col-md-6 col-lg-4">
                                <div className="widget">
                                    <h5 className="font-weight-bold text-uppercase">About PIÊU</h5>
                                    <p>The languages only differ in their grammar, their pronunciation and their most common words.</p>
                                    <div className="flex-display">
                                        <p>Phone: </p>
                                        <div className="mx-10">
                                            <p className="m-0">+84 906 985 174 - Mr.Nguyen</p>
                                            <p className="m-0">+84 984 096 424 - Mrs.Anh</p>
                                        </div>
                                    </div>
                                    <p>Email: thocampieu@gmail.com</p>
                                    <p>Address: 45/69 Tran Huy Lieu, phuong 12, Phu Nhuan, HCM</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-6 col-lg-4">
                                <div className="widget">
                                    <h5 className="font-weight-bold text-uppercase">Something</h5>
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <ul className="icon-list">
                                                <li><a href="#">Decor</a></li>
                                                <li><a href="#">Phu kien</a></li>
                                                <li><a href="#">Tui</a></li>
                                                <li><a href="#">Decor tuong</a></li>
                                                <li><a href="#">Decor Phong</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-xs-4">
                                            <ul className="icon-list">
                                                <li><a href="#">Decor</a></li>
                                                <li><a href="#">Phu kien</a></li>
                                                <li><a href="#">Tui</a></li>
                                                <li><a href="#">Decor tuong</a></li>
                                                <li><a href="#">Decor Phong</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-xs-4">
                                            <ul className="icon-list">
                                                <li><a href="#">Decor</a></li>
                                                <li><a href="#">Phu kien</a></li>
                                                <li><a href="#">Tui</a></li>
                                                <li><a href="#">Decor tuong</a></li>
                                                <li><a href="#">Decor Phong</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden-xs hidden-md col-lg-4">
                                <div className="widget">
                                    <h5 className="font-weight-bold text-uppercase">Map</h5>
                                    <img src={CommonConstants.IMAGES_DIR + "/common/popular_post_1.jpg"} alt="Post Thumbnail" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="divider-d" />
                <footer className="footer bg-dark">
                    <div className="container">
                        <div className="flex-display jus-space-bettween align-items-center">
                            <p className="copyright font-alt">Thổ Cẩm PIÊU - Brocade Decor</p>
                            <div className="footer-social-links">
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-dribbble"></i></a>
                                <a href="#"><i className="fa fa-skype"></i></a>
                            </div>
                        </div>
                    </div>
                </footer>
            </>}
        </>
    )
}
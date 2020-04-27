import React from 'react'
import CommonConstants from '../config/CommonConstants'

export default function YourOrders (props) {
    return (
        <div className="single-order">
            <div className="well">
                <h6 className="product-title font-alt m-0">82/14/30 Nguyen Xi, binh thanh</h6>
                <div className="single-order__title m-0">
                    <h4 className="product-title font-alt mb-0"><strong>15 March 2020</strong></h4>
                    <div>
                        <a href="#">Order Details</a>
                        <span className="v-line mx-10"></span>
                        <a href="#">Invoice</a>
                    </div>
                </div>
            </div>
            <div className="single-order__details px-20">
                <img src={process.env.PUBLIC_URL + CommonConstants.IMAGES_DIR + "/popular_post_1.jpg"} alt="Post Thumbnail"/>
                <div className="single-order__desc mx-30">
                    <h5 className="product-title font-alt m-0"><strong>Lonely planet Prague & Czech Republic (Trabel GUilde)</strong></h5>
                    <p className="font-alt m-0">Paperback</p>
                    <p className="font-alt m-0">In stock</p>
                </div>
                <button className="btn btn-b btn-round">Write a product review</button>
            </div>
        </div>
    )
}

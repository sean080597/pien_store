import React from 'react'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'

export default function YourOrders (props) {
    return (
        <div className="single-order">
            <div className="well">
                <h6 className="product-title font-alt mb-10">{props.orderInfo.shipmentable.address}</h6>
                <div className="single-order__title m-0">
                    <h4 className="product-title font-alt mb-0"><strong>{CommonService.formatDateTime(props.orderInfo.created_at)}</strong></h4>
                    <div>
                        <a href="#">Order Details</a>
                        <span className="v-line mx-10"></span>
                        <a href="#">Invoice</a>
                    </div>
                </div>
            </div>
            {
                props.orderInfo.products.map(item =>
                    <div className="single-order__details px-20 py-10" key={item.id}>
                        <div className="single-order__img">
                            <img src={process.env.PUBLIC_URL + CommonConstants.PRODUCTS_DIR + "/" + (item.image ? item.image : CommonConstants.PRODUCT_DEFAULT_IMAGE)} alt={item.name} />
                        </div>
                        <div className="single-order__desc mx-30">
                            <h5 className="product-title font-alt m-0"><strong>Lonely planet Prague & Czech Republic (Trabel GUilde)</strong></h5>
                            <p className="font-alt m-0">Paperback</p>
                            <p className="font-alt m-0">In stock</p>
                        </div>
                        <div className="single-order__btn-review">
                            <button className="btn btn-b btn-round">Write a product review</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

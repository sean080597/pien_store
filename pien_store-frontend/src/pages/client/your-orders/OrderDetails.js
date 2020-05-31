import React from 'react'
import _ from 'lodash'
import { useTurnOnOffLoader, useOrderDetails } from '../../../hooks/HookManager'
import {ProgressBarSteps} from '../../../components/ComponentsManager'
import CommonService from '../../../services/CommonService.service'
import CommonConstants from '../../../config/CommonConstants'

export default function OrderDetails(props) {
    useTurnOnOffLoader()
    const lsSteps = ['received', 'processing', 'delivering', 'delivered']
    const {orderDetailsInfo} = useOrderDetails(props.match.params.order_id)
    // shipping info
    const shipmentable = orderDetailsInfo.shipmentable
    const shipFullname = shipmentable ? (shipmentable.firstname + (shipmentable.midname ? ' ' + shipmentable.midname : '') + ' ' + shipmentable.lastname) : ''
    const shipPhone = shipmentable ? shipmentable.phone : ''
    const shipAddress = shipmentable ? shipmentable.address: ''
    const shipFee = CommonService.formatMoney(20000, 0)
    // status
    const orderDate = orderDetailsInfo.created_at ? CommonService.formatDateTime(orderDetailsInfo.created_at) : ''
    const posStep = orderDetailsInfo.status ? lsSteps.indexOf(orderDetailsInfo.status.toLowerCase()) : 1
    // order info
    const cartTotal = orderDetailsInfo.products ? CommonService.formatMoney(orderDetailsInfo.products.reduce((t, prod) => t + prod.price * prod.order_details.quantity, 0), 0) : 0

    return (
        <div className="main">
            <section className="module-small" id="order-section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 col-lg-offset-1">
                            <h4 className="font-alt mb-0">Order ID: {'OD' + _.truncate(orderDetailsInfo.id, {length: 12, omission: ''})}</h4>
                            <hr className="divider-w mt-10 mb-50"/>
                            <ProgressBarSteps curStep={posStep} lsSteps={lsSteps}/>
                            {/* List Products */}
                            {orderDetailsInfo.products &&
                            <div className="panel panel-default mt-50">
                                <div className="panel-heading">
                                    <h4 className="panel-title font-alt">Products</h4>
                                </div>
                                <div className="panel-body order-info">
                                    {
                                        orderDetailsInfo.products.map(item =>
                                            <div className="order-info__details px-20 py-10" key={item.id}>
                                                <div className="order-info__img">
                                                    <img src={process.env.PUBLIC_URL + CommonConstants.PRODUCTS_DIR + "/" + (item.image ? item.image.src : CommonConstants.PRODUCT_DEFAULT_IMAGE)} alt={item.image} />
                                                </div>
                                                <div className="order-info__desc mx-20">
                                                    <h5 className="product-title font-alt m-0"><strong>{item.name}</strong></h5>
                                                    <p className="font-alt m-0"><strong>Origin:</strong> {item.origin}</p>
                                                    <p className="font-alt m-0"><strong>Quantity:</strong> {item.order_details.quantity}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            }
                            {/* Others info */}
                            <div className="flex-display mt-30">
                                <div className="flex-1 pr-20">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title font-alt">Shipping Information</h4>
                                        </div>
                                        <div className="panel-body">
                                            <h6 className="font-alt mt-0"><strong>Fullname: </strong>{shipFullname}</h6>
                                            <h6 className="font-alt"><strong>Phone: </strong>{shipPhone}</h6>
                                            <h6 className="font-alt mb-0"><strong>Address: </strong>{shipAddress}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 pl-20">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title font-alt">Order Information</h4>
                                        </div>
                                        <div className="panel-body">
                                            <h6 className="font-alt mt-0"><strong>Ship Fee: </strong>{shipFee} VND</h6>
                                            <h6 className="font-alt"><strong>Total: </strong>{cartTotal} VND</h6>
                                            <h6 className="font-alt mb-0"><strong>Order Date: </strong>{orderDate}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

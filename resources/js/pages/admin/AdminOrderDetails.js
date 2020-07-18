import React from 'react'
import _ from 'lodash'
import { useOrderDetails, useCommonService } from '../../hooks/HookManager'
import { LazyLoadingImage } from '../../components/ComponentsManager'

export default function AdminOrderDetails(props) {
  const CommonService = useCommonService()
  const orderID = props.match.params.order_id
  const { orderDetailsInfo } = useOrderDetails(orderID)
  // shipping info
  const addressInfo = orderDetailsInfo.address_info
  const shipFullname = addressInfo ? (addressInfo.firstname + (addressInfo.midname ? ' ' + addressInfo.midname : '') + ' ' + addressInfo.lastname) : ''
  const shipPhone = addressInfo ? addressInfo.phone : ''
  const shipAddress = addressInfo ? addressInfo.address : ''
  const shipFee = CommonService.formatMoney(20000, 0)
  // status
  const orderDate = orderDetailsInfo.created_at ? CommonService.formatDateTime(orderDetailsInfo.created_at) : ''
  const orderStatus = orderDetailsInfo.status ? orderDetailsInfo.status : ''
  // order info
  const cartTotal = orderDetailsInfo.products ? CommonService.formatMoney(orderDetailsInfo.products.reduce((t, prod) => t + prod.price * prod.order_details.quantity, 0), 0) : 0
  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-12 admin-title">
          <h4 className="font-alt">Order Date: {orderDate}</h4><br/>
          <h4 className="font-alt">Order Status: {orderStatus}</h4>
        </div>
        <div className="col-sm-12">
          {/* List Products */}
          {orderDetailsInfo.products &&
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title font-alt">Products</h4>
              </div>
              <div className="panel-body adm-order-info">
                {
                  orderDetailsInfo.products.map(item =>
                    <div className="col-sm-12 col-md-6 adm-order-info__details p-10" key={item.id}>
                      <div className="adm-order-info__img">
                        <LazyLoadingImage src={CommonService.generateImageSrc('products', item)} alt={item.image} />
                      </div>
                      <div className="adm-order-info__desc mx-20">
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
          <div className="row mt-30">
            <div className="col-sm-12 col-md-6 pr-20">
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
            <div className="col-sm-12 col-md-6 pl-20">
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
    </section>
  )
}

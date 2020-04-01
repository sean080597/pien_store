import React from 'react'
import {useSelector} from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import {useTurnOnOffLoader, useShopCart} from '../hooks/HookManager'

export default function Cart (props) {
    useTurnOnOffLoader()
    const {handleChangeQuantity} = useShopCart({}, 'CART_COMPONENT')
    //state
    const {cartItems, cartCount, cartTotal} = useSelector(state => ({
        cartItems: state.shop.cartItems,
        cartCount: state.shop.cartCount,
        cartTotal: state.shop.cartTotal
    }))
    return (
        <>
        <div className="main">
            <section className="module">
                <div className="container">
                    <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1 className="module-title font-alt">{CommonConstants.PAGES.CART.TITLE}</h1>
                    </div>
                    </div>
                    <hr className="divider-w pt-20"/>
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table table-striped table-border checkout-table">
                                <tbody>
                                    <tr>
                                        <th className="hidden-xs">Item</th>
                                        <th>Description</th>
                                        <th className="hidden-xs">Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Remove</th>
                                    </tr>
                                    {
                                        cartItems.map((item, index) =>
                                            <tr key={index}>
                                                <td className="hidden-xs"><a href="#">
                                                    <img src={process.env.PUBLIC_URL + CommonConstants.PRODUCTS_DIR + "/" + (item.image ? item.image : CommonConstants.PRODUCT_DEFAULT_IMAGE)} alt={item.name}/>
                                                    </a>
                                                </td>
                                                <td>
                                                    <h5 className="product-title font-alt">{item.name}</h5>
                                                </td>
                                                <td className="hidden-xs">
                                                    <h5 className="product-title font-alt">{CommonService.formatMoney(item.price, 0)} VNĐ</h5>
                                                </td>
                                                <td>
                                                    <input className="form-control" type="text" pattern="[0-9]*" name={'cart_quantity_' + index} onChange={(e) => handleChangeQuantity(e, item)} value={item.quantity} max="50" min="1"/>
                                                </td>
                                                <td>
                                                    <h5 className="product-title font-alt">{CommonService.formatMoney(item.price * item.quantity, 0)} VNĐ</h5>
                                                </td>
                                                <td className="pr-remove"><a href="#" title="Remove"><i className="fa fa-times"></i></a></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <input className="form-control" type="text" id="" name="" placeholder="Coupon code"/>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <button className="btn btn-round btn-g" type="submit">Apply</button>
                            </div>
                        </div>
                        <div className="col-sm-3 col-sm-offset-3">
                            <div className="form-group">
                                <button className="btn btn-block btn-round btn-d pull-right" type="submit">Update Cart</button>
                            </div>
                        </div>
                    </div> */}
                    <hr className="divider-w"/>
                    <div className="row mt-70">
                        <div className="col-sm-5 col-sm-offset-7">
                            <div className="shop-Cart-totalbox">
                                <h4 className="font-alt">Cart Totals</h4>
                                <table className="table table-striped table-border checkout-table">
                                    <tbody>
                                    <tr>
                                        <th>Cart Subtotal :</th>
                                        <td>{CommonService.formatMoney(cartTotal, 0)} VNĐ</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping Total :</th>
                                        <td>£2.00</td>
                                    </tr>
                                    <tr className="shop-Cart-totalprice">
                                        <th>Total :</th>
                                        <td>£42.00</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <button className="btn btn-lg btn-block btn-round btn-d" type="submit">Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}
import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import {useTurnOnOffLoader, useShopCart} from '../hooks/HookManager'

export default function Cart (props) {
    useTurnOnOffLoader()
    const {handleChangeQuantity, applyRemoveCartItem} = useShopCart({}, 'CART_COMPONENT')
    //state
    const {cartItems, cartTotal} = useSelector(state => ({
        cartItems: state.shop.cartItems,
        cartTotal: state.shop.cartTotal
    }))

    return (
        <>
        <div className="main">
            <section className="module-small">
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
                                        <th className="col-sm-4">Description</th>
                                        <th className="hidden-xs col-sm-2">Price</th>
                                        <th className="col-sm-1">Quantity</th>
                                        <th className="col-sm-3">Total</th>
                                        <th className="col-sm-1">Remove</th>
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
                                                    <h5 className="product-title font-alt">{CommonService.formatMoney(item.price, 0) + ' VNĐ'}</h5>
                                                </td>
                                                <td>
                                                    <input className="form-control" type="text" pattern="[0-9]*" name={'cart_quantity_' + index} onChange={(e) => handleChangeQuantity(e, item)} value={item.quantity} maxLength="4" min="1"/>
                                                </td>
                                                <td>
                                                    <h5 className="product-title font-alt">{CommonService.formatMoney(item.price * item.quantity, 0) + ' VNĐ'}</h5>
                                                </td>
                                                <td className="pr-remove"><button title="Remove" onClick={() => applyRemoveCartItem(item)}><i className="fa fa-times"></i></button></td>
                                            </tr>
                                        )
                                    }
                                    {
                                        (!cartItems || cartItems.length === 0) &&
                                        <tr>
                                            <td colSpan="6">
                                                <h4 className="font-alt text-danger text-center">{CommonConstants.PAGES.CART.NO_CART_ITEMS}</h4>
                                            </td>
                                        </tr>
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
                    <div className="row mt-50">
                        <div className="col-sm-5 col-sm-offset-7">
                            <div className="shop-Cart-totalbox">
                                <h4 className="font-alt">Cart Totals</h4>
                                <table className="table table-striped table-border checkout-table">
                                    <tbody>
                                    {/* <tr>
                                        <th>Cart Subtotal :</th>
                                        <td>{CommonService.formatMoney(cartTotal, 0) + ' VNĐ'}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping Total :</th>
                                        <td>£2.00</td>
                                    </tr> */}
                                    <tr className="shop-Cart-totalprice">
                                        <th>Total :</th>
                                        <td>{CommonService.formatMoney(cartTotal, 0) + ' VNĐ'}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <Link to="/checkout" className="btn btn-lg btn-block btn-round btn-d" type="submit" disabled={!cartItems || cartItems.length === 0}>Proceed to Checkout</Link>
                                {/* <button onClick={() => handleProceedToCheckout()}>checkiut</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

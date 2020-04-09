import React, { useRef } from 'react'
import {useSelector} from 'react-redux'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import {useTurnOnOffLoader, useCheckout, useShopCart} from '../hooks/HookManager'
import Modal from '../components/Modal'

export default function ConfirmInfo (props) {
    useTurnOnOffLoader()
    useShopCart({}, 'CHECKOUT_COMPONENT')
    //modal ref
    const modalRef = useRef()
    const openModal = () => {
        modalRef.current.openModal()
    }
    const closeModal = () => {
        modalRef.current.closeModal()
    }
    //state
    const {userProfileDetails, cartItems, cartTotal} = useSelector(state => ({
        userProfileDetails: state.auth.profile,
        cartItems: state.shop.cartItems,
        cartTotal: state.shop.cartTotal
    }))

    const userFullname = (userProfileDetails.firstname || userProfileDetails.lastname) ? (userProfileDetails.firstname + ' ' + userProfileDetails.lastname) : ''
    const INITIAL_STATE = {firstname: '', lastname: '', gender: '1', phone: '', address: ''}
    const {userInputs, handleChange, handleSubmitInfo} = useCheckout(INITIAL_STATE, modalRef)

    return (
        <>
        <div className="main">
            <section className="module bg-dark-30 about-page-header" style={{ backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.CONFIRM_INFO_BG})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <h1 className="module-title font-alt mb-0">Forms</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="module">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <h4 className="font-alt">Cart Information</h4>
                            <table className="table table-striped table-border checkout-table">
                                <tbody>
                                    <tr>
                                        <th className="hidden-xs">Item</th>
                                        <th className="col-sm-4">Description</th>
                                        <th className="hidden-xs col-sm-2">Price</th>
                                        <th className="col-sm-1">Quantity</th>
                                        <th className="col-sm-3">Total</th>
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
                                                    <h5 className="product-title font-alt">{item.quantity}</h5>
                                                </td>
                                                <td>
                                                    <h5 className="product-title font-alt">{CommonService.formatMoney(item.price * item.quantity, 0) + ' VNĐ'}</h5>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    {
                                        (!cartItems || cartItems.length === 0) &&
                                        <tr>
                                            <td colSpan="5">
                                                <h4 className="font-alt text-danger text-center">{CommonConstants.PAGES.CART.NO_CART_ITEMS}</h4>
                                            </td>
                                        </tr>
                                    }
                                    <tr>
                                        <td colSpan="4" className="text-right"><h5 className="m-0"><strong>Total:</strong></h5></td>
                                        <td><h5 className="product-title font-alt m-0">{CommonService.formatMoney(cartTotal, 0) + ' VNĐ'}</h5></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-4">
                            <div className="flex-display vertical-center">
                                <h4 className="font-alt mb-0">Receiving info</h4>
                                <button className="btn btn-b btn-round btn-xs ml-10 small-text" type="button" onClick={openModal}><i className="fa fa-edit"></i> Edit</button>
                            </div>
                            <hr className="divider-w mt-10 mb-10"/>
                            <h5><strong>Fullname</strong>: {userFullname}</h5>
                            <h5><strong>Email</strong>: {userProfileDetails.email}</h5>
                            <h5><strong>Gender</strong>: {userProfileDetails.gender === 0 ? 'Female' : 'Male'}</h5>
                            <h5><strong>Address</strong>: {userProfileDetails.address}</h5>
                            <h5><strong>Phone</strong>: {userProfileDetails.phone}</h5>
                        </div>
                    </div>
                </div>
            </section>
            <Modal ref={modalRef} modalWidth="40%">
                <h4 className="font-alt mb-0">User Information</h4>
                <hr className="divider-w mt-10 mb-20"/>
                <form className="form" onSubmit={handleSubmitInfo}>
                <div className="form-group">
                    <div className="row form-group-input flex-display">
                        <input className="form-control" id="firstname" type="text" name="firstname" placeholder="Enter first name"
                        onChange={handleChange} value={userInputs.firstname}/>
                        <input className="form-control" id="lastname" type="text" name="lastname" placeholder="Enter last name"
                        onChange={handleChange} value={userInputs.lastname}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row form-group-input flex-display">
                        <select className="form-control" name="gender" onChange={handleChange} value={userInputs.gender}>
                            <option value="1" defaultValue>Male</option>
                            <option value="0" >Female</option>
                        </select>
                        <input className="form-control" id="phone" type="text" name="phone" placeholder="Enter phone" maxLength="10"
                        onChange={handleChange} value={userInputs.phone}/>
                    </div>
                </div>
                <div className="form-group flex-display">
                    <input className="form-control" id="address" type="text" name="address" placeholder="Enter address"
                    onChange={handleChange} value={userInputs.address}/>
                </div>
                <hr className="divider-w mt-10 mb-20"/>
                <div className="form-group row form-group-input flex-display">
                    <button className="btn btn-b btn-round m" type="submit">Submit</button>
                    <button className="btn btn-b btn-round m" type="button" onClick={closeModal}>Close</button>
                </div>
                </form>
            </Modal>
        </div>
        }
        </>
    )
}

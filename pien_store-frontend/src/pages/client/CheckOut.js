import React, { useRef } from 'react'
import {useSelector} from 'react-redux'
import CommonConstants from '../../config/CommonConstants'
import CommonService from '../../services/CommonService.service'
import {useTurnOnOffLoader, useCheckout, useShopCart} from '../../hooks/HookManager'
import {Modal} from '../../components/ComponentsManager'

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
    const {cartItems, cartTotal, orderAddresses, selectedAddress} = useSelector(state => ({
        cartItems: state.shop.cartItems,
        cartTotal: state.shop.cartTotal,
        orderAddresses: state.checkout.orderAddresses,
        selectedAddress: state.checkout.selectedAddress
    }))

    const INITIAL_STATE = {firstname: '', lastname: '', phone: '', address: '', isShowAddNewAddress: false}
    const {userInputs, handleChange, handleSwitchAddress, handleChangedAddress, handleCancelChangedAddress,
        handleAddNewAddress, handleConfirmOrder, handleShowAddNewAddress, handleDeleteShipmentDetails,
        handleSetEditableShipment, handleEditShipmentDetail} = useCheckout(INITIAL_STATE, modalRef)
    const isSubmitDisabled = !(userInputs.firstname && userInputs.lastname && userInputs.address && userInputs.phone)

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
            <section className="module-small">
                <div className="container">
                    <div className="row flex-display">
                        <div className="col-sm-8">
                            <h4 className="font-alt">Cart Information</h4>
                            <table className="table table-striped custom-border-table">
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
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-4">
                            <div className="sticky-item">
                                <div className="flex-display align-ver-center">
                                    <h4 className="font-alt mb-0">Shipment Details</h4>
                                    <button className="btn btn-b btn-round btn-xs ml-10 small-text" type="button" onClick={openModal}>
                                        <i className="fa fa-edit"></i> Edit
                                    </button>
                                </div>
                                <hr className="divider-w mt-10 mb-20"/>
                                <h5><strong>Fullname</strong>: {CommonService.checkValueToShow(selectedAddress.fullname)}</h5>
                                <h5><strong>Address</strong>: {CommonService.checkValueToShow(selectedAddress.address)}</h5>
                                <h5><strong>Phone</strong>: {CommonService.checkValueToShow(selectedAddress.phone)}</h5>
                                <hr className="divider-w mt-10 mb-20"/>
                                <div className="flex-display">
                                    <h5 className="m-0"><strong>Total:</strong></h5>
                                    <h5 className="product-title font-alt ml-10">{CommonService.formatMoney(cartTotal, 0) + ' VNĐ'}</h5>
                                </div>
                                { CommonService.isObjectEmpty(selectedAddress) && <span>{CommonConstants.MSG.ERROR.REQUIRED_ORDER_ADDRESS}</span> }
                                <button type="button" className="btn btn-b btn-md btn-round btn-block small-text mt-10" onClick={() => handleConfirmOrder()}
                                    disabled={CommonService.isObjectEmpty(selectedAddress)} >Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal ref={modalRef} modalWidth="70%">
                <h4 className="font-alt mb-0">Shipment Addresses</h4>
                <hr className="divider-w mt-10 mb-20"/>
                <table className="table table-striped table-border address-table mb-0">
                    <thead>
                        <tr>
                            <th>Fullname</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orderAddresses.map((addr, index) =>
                            <tr key={index}>
                                <td>
                                    {!addr.isEditable && <h5 className="product-title font-alt mb-0">{addr.fullname}</h5>}
                                    {addr.isEditable &&
                                    <div className="row form-group-input flex-display direction-row">
                                        <input className="form-control mr-0" id="firstname" type="text" name="firstname" placeholder="Firstname"
                                            onChange={handleChange} value={userInputs.firstname}/>
                                        <input className="form-control" id="lastname" type="text" name="lastname" placeholder="Lastname"
                                            onChange={handleChange} value={userInputs.lastname}/>
                                    </div>
                                    }
                                </td>
                                <td>
                                    {!addr.isEditable && <h5 className="product-title font-alt mb-0">{addr.address}</h5>}
                                    {addr.isEditable &&
                                    <input className="form-control" id="address" type="text" name="address" placeholder="Address"
                                        onChange={handleChange} value={userInputs.address}/>
                                    }
                                </td>
                                <td>
                                    {!addr.isEditable && <h5 className="product-title font-alt mb-0">{addr.phone}</h5>}
                                    {addr.isEditable &&
                                    <input className="form-control" id="phone" type="text" pattern="[0-9]*" name="phone" placeholder="Phone" maxLength="10"
                                        onChange={handleChange} value={userInputs.phone}/>
                                    }
                                </td>
                                <td>
                                    {!addr.isEditable &&
                                    <div className="flex-display jus-space-around align-ver-center">
                                        <input className="m-0" type='radio' name={'rad_btn_checkout_' + index} value={index} checked={addr.isChecked} onChange={(e)=>handleSwitchAddress(e)}/>
                                        <button className="btn-b btn btn-round px-10 py-5" title="Edit shipment details"
                                        style={{ visibility: !addr.email ? 'visible': 'hidden' }}
                                        disabled={addr.email ? true : false}
                                        onClick={() => handleSetEditableShipment(addr, true)}>
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button className="btn-danger btn btn-round px-10 py-5" title="Delete shipment details"
                                        style={{ visibility: !addr.email ? 'visible': 'hidden' }}
                                        disabled={addr.email ? true : false}
                                        onClick={() => handleDeleteShipmentDetails(addr.id)}>
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                    }
                                    {addr.isEditable &&
                                    <div className="flex-display jus-space-around col-new-address">
                                        <button className="btn btn-b btn-round" type="button" onClick={() => handleEditShipmentDetail(addr)} disabled={isSubmitDisabled}><i className="fa fa-check"></i></button>
                                        <button className="btn btn-b btn-round" type="button" onClick={() => handleSetEditableShipment(addr, false)}><i className="fa fa-times"></i></button>
                                    </div>
                                    }
                                </td>
                            </tr>
                        )
                    }
                        <tr key={999}>
                            { !userInputs.isShowAddNewAddress &&
                                <td colSpan="4">
                                    <button className="btn btn-round btn-block btn-neutral" onClick={() => handleShowAddNewAddress(true)}><i className="fa fa-plus"></i></button>
                                </td>
                            }
                            { userInputs.isShowAddNewAddress &&
                            <>
                                <td>
                                    <div className="row form-group-input flex-display direction-row">
                                        <input className="form-control mr-0" id="firstname" type="text" name="firstname" placeholder="Firstname"
                                            onChange={handleChange} value={userInputs.firstname}/>
                                        <input className="form-control" id="lastname" type="text" name="lastname" placeholder="Lastname"
                                            onChange={handleChange} value={userInputs.lastname}/>
                                    </div>
                                </td>
                                <td>
                                    <input className="form-control" id="address" type="text" name="address" placeholder="Address"
                                        onChange={handleChange} value={userInputs.address}/>
                                </td>
                                <td>
                                    <input className="form-control" id="phone" type="text" pattern="[0-9]*" name="phone" placeholder="Phone" maxLength="10"
                                        onChange={handleChange} value={userInputs.phone}/>
                                </td>
                                <td>
                                    <div className="flex-display jus-space-around col-new-address">
                                        <button className="btn btn-b btn-round" type="button" onClick={() => handleAddNewAddress()} disabled={isSubmitDisabled}><i className="fa fa-check"></i></button>
                                        <button className="btn btn-b btn-round" type="button" onClick={() => handleShowAddNewAddress(false)}><i className="fa fa-times"></i></button>
                                    </div>
                                </td>
                            </>
                            }
                        </tr>
                    </tbody>
                </table>
                <hr className="divider-w mt-10 mb-20"/>
                <div className="form-group row form-group-input">
                    <div className="col-sm-offset-3 col-sm-6 flex-display">
                        <button className="btn btn-b btn-round" type="button" onClick={() => handleChangedAddress()}>Save</button>
                        <button className="btn btn-b btn-round" type="button" onClick={() => handleCancelChangedAddress()}>Close</button>
                    </div>
                </div>
            </Modal>
        </div>
        }
        </>
    )
}

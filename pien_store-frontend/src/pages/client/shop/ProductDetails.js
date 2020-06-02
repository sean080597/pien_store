import React from 'react'
import CommonConstants from '../../../config/CommonConstants'
import CommonService from '../../../services/CommonService.service'
import { useSelector } from 'react-redux';
import { useTurnOnOffLoader, useProductDetails, useShopCart } from '../../../hooks/HookManager'
import {ProductDetailsGliderImages} from '../../../components/ComponentsManager'

export default function ProductDetails(props) {
    useTurnOnOffLoader()
    const INITIAL = {quantity: 1}
    const {productInfo, userInputs, handleChangeQuantity, handleReplaceProduct} = useProductDetails(props.match.params.prod_id, INITIAL)
    const {handleAddToCart} = useShopCart({}, 'PRODUCT_DETAILS_COMPONENT')
    const {relatedProducts} = useSelector(state => ({
        relatedProducts: state.shop.relatedProducts
    }))
    return (
        <div className="main">
            <section className="module">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 mb-sm-40">
                            <img src={CommonService.generateImageSrc('products', productInfo.image.src)} alt={productInfo.name} />
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h1 className="product-title font-alt">{productInfo.name}</h1>
                                </div>
                            </div>
                            {/* <div className="row mb-20">
                                <div className="col-sm-12"><span><i className="fa fa-star star"></i></span><span><i className="fa fa-star star"></i></span><span><i className="fa fa-star star"></i></span><span><i className="fa fa-star star"></i></span><span><i className="fa fa-star star-off"></i></span><a className="open-tab section-scroll" href="#reviews">-2customer reviews</a>
                                </div>
                            </div> */}
                            <div className="row mb-20">
                                <div className="col-sm-12">
                                    <div className="price font-alt"><span className="amount">{CommonService.formatMoney(productInfo.price, 0) + ' VNĐ'}</span></div>
                                </div>
                            </div>
                            <div className="row mb-20">
                                <div className="col-sm-12">
                                    <table className="table table-striped ds-table table-responsive">
                                        <tbody>
                                            <tr>
                                                <th>Title</th>
                                                <th>Info</th>
                                            </tr>
                                            <tr>
                                                <td>Compositions</td>
                                                <td>Jeans</td>
                                            </tr>
                                            <tr>
                                                <td>Size</td>
                                                <td>44, 46, 48</td>
                                            </tr>
                                            <tr>
                                                <td>Color</td>
                                                <td>Black</td>
                                            </tr>
                                            <tr>
                                                <td>Brand</td>
                                                <td>Somebrand</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row mb-20">
                                <div className="col-sm-4 mb-sm-20">
                                    <input className="form-control" type="text" pattern="[0-9]*" name="quantity"
                                    onChange={handleChangeQuantity} value={userInputs.quantity} maxLength="4" min="1"/>
                                </div>
                                <div className="col-sm-8">
                                    <button className="btn btn-lg btn-block btn-round btn-b" onClick={() => handleAddToCart(productInfo, userInputs.quantity)}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-70">
                        <div className="col-sm-12">
                            <ul className="nav nav-tabs font-alt" role="tablist">
                                <li className="active"><a href="#description" data-toggle="tab"><span className="icon-tools-2"></span>Description</a></li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="description">
                                    <p>{productInfo.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <hr className="divider-w"></hr>
            <section className="module-small">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <h2 className="module-title font-alt">Related Products</h2>
                            <div className="module-subtitle font-serif">The languages only differ in their grammar, their pronunciation and their most common words.</div>
                        </div>
                    </div>
                    <div className="row">
                        { relatedProducts.length > 0 &&
                        <ProductDetailsGliderImages>
                            {
                                relatedProducts.map(prod =>
                                    <div key={prod.id} onClick={() => handleReplaceProduct(prod.id)}>
                                        <img alt={prod.name}
                                        src={CommonService.generateImageSrc('products', prod.image.src)} />
                                        <div className="glide__title">
                                            <h4 className="shop-item-title font-alt ml-10 mr-10">{prod.name}</h4>
                                            <p className="ml-10 mr-10 mb-10">{CommonService.formatMoney(prod.price, 0) + ' VNĐ'}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </ProductDetailsGliderImages> }
                    </div>
                </div>
            </section>
        </div>
    )
}

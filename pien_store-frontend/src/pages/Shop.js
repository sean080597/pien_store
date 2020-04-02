import React from 'react'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import PagePagination from '../components/PagePagination'
import { useSelector } from 'react-redux';
import { useTurnOnOffLoader, useShopCart } from '../hooks/HookManager'

export default function Shop(props) {
    useTurnOnOffLoader()
    const INITIAL = {sort_price: "", cate_id: props.location.state ? props.location.state.cate_id : ''}
    const {filterInputs, handleChange, handleSubmitFilter, handleAddToCart} = useShopCart(INITIAL, 'SHOP_COMPONENT')
    //state
    const {categories, products} = useSelector(state => ({
        categories: state.shop.categories,
        products: state.shop.products
    }))

    return (
        <div className="main">
            <section className="module bg-dark-60 shop-page-header" style={{backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.SHOP_BG})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <h2 className="module-title font-alt">Shop Products</h2>
                            <div className="module-subtitle font-serif">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="module-small" id="section-filter">
                <div className="container">
                    <form className="row" onSubmit={handleSubmitFilter}>
                        <div className="col-sm-4 mb-sm-20">
                            <select className="form-control" name="sort_price" onChange={handleChange} value={filterInputs.sort_price}>
                                <option value="" defaultValue>Default Sorting</option>
                                {
                                    CommonConstants.SORT_TYPES.map(type =>
                                        <option value={type.key} key={type.key}>{type.value}</option>
                                    )
                                }
                            </select>
                        </div>
                        {/* <div className="col-sm-2 mb-sm-20">
                            <select className="form-control">
                                <option defaultValue>Woman</option>
                                <option>Man</option>
                            </select>
                        </div> */}
                        <div className="col-sm-3 mb-sm-20">
                            <select className="form-control" name="cate_id" onChange={handleChange} value={filterInputs.cate_id}>
                                <option value="" defaultValue>All</option>
                                {
                                    categories.map((cate, index) =>
                                        <option value={cate.slug} key={index}>{cate.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <button className="btn btn-block btn-round btn-g" type="submit">Apply</button>
                        </div>
                    </form>
                </div>
            </section>
            <hr className="divider-w"/>
            <section className="module-small">
                <div className="container">
                    <div className="row multi-columns-row">
                        {
                            products.map((prod, index) =>
                                <div className="col-sm-6 col-md-3 col-lg-3" key={index}>
                                    <div className="shop-item">
                                        <div className="shop-item-image">
                                            <img src={process.env.PUBLIC_URL + CommonConstants.PRODUCTS_DIR + "/" + (prod.image ? prod.image : CommonConstants.PRODUCT_DEFAULT_IMAGE)} alt={prod.name} />
                                            <div className="shop-item-detail"><button className="btn btn-round btn-b" onClick={() => handleAddToCart(prod)}><span className="icon-basket">Add To Cart</span></button></div>
                                        </div>
                                        <h4 className="shop-item-title font-alt"><a href="#">{prod.name}</a></h4>{CommonService.formatMoney(prod.price, 0) + ' VNĐ'}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <PagePagination isShow="true" filterInputs={filterInputs}/>
                </div>
            </section>
        </div>
    )
}

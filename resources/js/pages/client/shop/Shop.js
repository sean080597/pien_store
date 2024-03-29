import React from 'react'
import {Link} from 'react-router-dom'
import CommonConstants from '../../../config/CommonConstants'
import { useSelector } from 'react-redux';
import {PagePagination, LazyLoadingImage} from '../../../components/ComponentsManager'
import { useTurnOnOffLoader, useShopCart, useCommonService } from '../../../hooks/HookManager'

export default function Shop(props) {
    const CommonService = useCommonService()
    useTurnOnOffLoader()
    const INITIAL = {sort_price: "", cate_id: props.location.state ? props.location.state.cate_id : ''}
    const {filterInputs, handleChange, handleSubmitFilter, handleAddToCart, handlePaginate} = useShopCart(INITIAL, 'SHOP_COMPONENT')
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
                            <h2 className="titan-title-size-4 font-alt text-center">Products</h2>
                            <div className="module-subtitle font-serif">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="module-small" id="section-filter">
                <div className="container">
                    <form className="row" onSubmit={handleSubmitFilter}>
                        <div className="col-sm-4 ">
                            <select className="form-control" name="sort_price" onChange={handleChange} value={filterInputs.sort_price}>
                                <option value="" defaultValue>Default Sorting</option>
                                {
                                    CommonConstants.SORT_TYPES.map(type =>
                                        <option value={type.key} key={type.key}>{type.value}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-sm-4 ">
                            <select className="form-control" name="cate_id" onChange={handleChange} value={filterInputs.cate_id}>
                                <option value="" defaultValue>All</option>
                                {
                                    categories.map((cate, index) =>
                                        <option value={cate.id} key={index}>{cate.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-block btn-round btn-g" type="submit">Apply</button>
                        </div>
                    </form>
                </div>
            </section>
            <hr className="divider-w"/>
            <section className="module-small">
                <div className="container">
                    <div className="row flex-display">
                        {
                            products.map((prod, index) =>
                                <div className="col-sm-4 col-md-2" key={index}>
                                    <div className="shop-item">
                                        <div className="shop-item-image">
                                            <LazyLoadingImage src={CommonService.generateImageSrc('products', prod)} alt={prod.name} />
                                            <div className="shop-item-detail"><button className="btn-small-pad btn-round btn-b" onClick={() => handleAddToCart(prod)}><span className="icon-basket">Add To Cart</span></button></div>
                                        </div>
                                        <h4 className="shop-item-title font-alt"><Link to={'/productDetail/' + prod.id}>{prod.name}</Link></h4>{CommonService.formatMoney(prod.price, 0) + ' VNĐ'}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <PagePagination isShow="true" handlePaginate={handlePaginate}/>
                </div>
            </section>
        </div>
    )
}

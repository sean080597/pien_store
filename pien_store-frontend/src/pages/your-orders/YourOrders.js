import React from 'react'
import {useSelector} from 'react-redux'
import {useYourOrders, useTurnOnOffLoader} from '../../hooks/HookManager'
import {SingleOrder, PagePagination} from '../../components/ComponentsManager'

export default function YourOrders (props) {
    useTurnOnOffLoader()
    const {handlePaginate} = useYourOrders()
    //state
    const {recentOrders} = useSelector(state => ({
        recentOrders: state.yourOrders.lsRecentOrders
    }))
    return (
        <div className="main">
            <section className="module-small" id="order-section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 className="product-title font-alt">Your Orders</h3>
                            {
                                recentOrders.map((item, index) =>
                                    <SingleOrder orderInfo={item} key={index}/>
                                )
                            }
                        </div>
                        <div className="col-sm-12">
                            <PagePagination isShow="true" handlePaginate={handlePaginate} statePagination={0}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

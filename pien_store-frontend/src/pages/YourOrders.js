import React from 'react'
import {useYourOrders, useTurnOnOffLoader} from '../hooks/HookManager'
import CommonConstants from '../config/CommonConstants'
import SingleOrder from '../components/SingleOrder'

export default function YourOrders (props) {
    useTurnOnOffLoader()
    const {handlePaginate} = useYourOrders()
    return (
        <div className="main">
            <section className="module-small" id="order-section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 className="product-title font-alt">Your Orders</h3>
                            <SingleOrder/>
                            <SingleOrder/>
                            <SingleOrder/>
                            <SingleOrder/>
                            <SingleOrder/>
                            <SingleOrder/>
                        </div>
                        <div className="col-sm-12">
                            {/* <PagePagination isShow="true" filterInputs={filterInputs}/> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

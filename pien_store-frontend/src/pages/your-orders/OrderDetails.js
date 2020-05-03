import React from 'react'
import { useTurnOnOffLoader, useOrderDetails } from '../../hooks/HookManager'

export default function OrderDetails(props) {
    useTurnOnOffLoader()
    const {orderDetailsInfo} = useOrderDetails(props.match.params.order_id)

    return (
        <div className="main">
            <section className="module-small" id="order-section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 col-lg-offset-1">
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

import React from 'react'
import CommonConstants from '../config/CommonConstants.config'
import { useTurnOnOffLoader } from '../hooks/HookManager'

export default function Shop(props) {
    useTurnOnOffLoader()
    return (
        <>
            <section className="module bg-dark-60 shop-page-header" style={{backgroundImage: `url(${CommonConstants.HOME_BG})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <h2 className="module-title font-alt">Shop Products</h2>
                            <div className="module-subtitle font-serif">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

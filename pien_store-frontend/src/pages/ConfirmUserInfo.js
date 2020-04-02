import React from 'react'
import CommonConstants from '../config/CommonConstants'
import {useTurnOnOffLoader, useConfirmInfo} from '../hooks/HookManager'

export default function ConfirmInfo (props) {
    useTurnOnOffLoader()
    const INITIAL = {sort_price: "", cate_id: props.location.state ? props.location.state.cate_id : ''}
    const {userInputs, handleChange, handleSubmitInfo} = useConfirmInfo(INITIAL)
    return (
        <div className="main">
            <section className="module bg-dark-30 about-page-header" style={{backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.CONFIRM_INFO_BG})`}}>
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
                        <div className="col-sm-8 col-sm-offset-2">
                            <h4 className="font-alt mb-0">Basic Forms</h4>
                            <hr className="divider-w mt-10 mb-20" />
                            <form className="form" role="form">
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Default input" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

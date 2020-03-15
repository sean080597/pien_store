import React, { Component } from 'react'
import CommonConfig from '../config/Common.config'

export default class Login extends Component {
    render() {
        return (
            <div>
                <section className="module bg-dark-30" style={{backgroundImage: `url(${CommonConfig.LOGIN_BG})`}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3">
                                <h1 className="module-title font-alt mb-0">Login-Register</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="module">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 col-sm-offset-1 mb-sm-40">
                                <h4 className="font-alt">Login</h4>
                                <hr className="divider-w mb-10" />
                                <form className="form">
                                    <div className="form-group">
                                        <input className="form-control" id="username" type="text" name="username" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" id="password" type="password" name="password" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-round btn-b">Login</button>
                                    </div>
                                    <div className="form-group"><a href="">Forgot Password?</a></div>
                                </form>
                            </div>
                            <div className="col-sm-5">
                                <h4 className="font-alt">Register</h4>
                                <hr className="divider-w mb-10" />
                                <form className="form">
                                    <div className="form-group">
                                        <input className="form-control" id="E-mail" type="text" name="email" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" id="username" type="text" name="username" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" id="password" type="password" name="password" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" id="re-password" type="password" name="re-password" placeholder="Re-enter Password" />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-block btn-round btn-b">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

import React from 'react'
import CommonConstants from '../config/CommonConstants'
import {useTurnOnOffLoader, useFormLogin, validationAuth} from '../hooks/HookManager'

export default function Login (props){
    //init
    useTurnOnOffLoader()
    const INITIAL_STATE = {email: "", password: ""}
    const {userInputs, handleChange, handleSubmitLogin, handleBlur, errors} = useFormLogin(INITIAL_STATE, validationAuth)

    //methods

    return (
        <div className="main">
            <section className="module bg-dark-30" style={{backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.LOGIN_BG})`}}>
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
                            <form className="form" onSubmit={handleSubmitLogin}>
                                <div className="form-group">
                                    <input id="email" type="email" name="email" placeholder="Email"
                                        className={"form-control " + (errors.email && 'error-input')}
                                        onChange={handleChange} value={userInputs.email} onBlur={handleBlur} />
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                </div>
                                <div className="form-group">
                                    <input id="password" type="password" name="password" placeholder="Password"
                                        className={"form-control " + (errors.password && 'error-input')}
                                        onChange={handleChange} value={userInputs.password} onBlur={handleBlur} />
                                    {errors.password && <p className="text-danger">{errors.password}</p>}
                                    {errors.wrongInfo && <p className="text-danger">{errors.wrongInfo}</p>}
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-round btn-b" type="submit">Login</button>
                                </div>
                                <div className="form-group"><a href="/">Forgot Password?</a></div>
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

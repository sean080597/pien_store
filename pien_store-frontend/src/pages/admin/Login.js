import React from 'react'
import CommonConstants from '../../config/CommonConstants'
import {useInitializePageAdmin, useFormLogin, validationInputs} from '../../hooks/HookManager'

export default function Login (props){
    useInitializePageAdmin()
    const INITIAL_STATE = {email: "", password: ""}
    const {userInputs, handleChange, handleSubmitLogin, handleBlur, errors} = useFormLogin(INITIAL_STATE, validationInputs)

    //methods

    return (
        <div className="main">
            <section className="module-small flex-display align-items-center login-admin--section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 col-sm-offset-1 login-admin--form">
                            <h3 className="font-alt login-admin--title">Login</h3>
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
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

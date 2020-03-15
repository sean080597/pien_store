import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div className="cus_bg-login">
                <div className="cus_bg-blur"></div>
                <div className="flex main-content">
                    <div className="w-1/3"></div>
                    <div className="w-1/3 mt-10 p-4 cus_bg-white rounded-md">
                        <div className="blur-bg"></div>
                        <form className="border border-white rounded-md">
                            <div className="p-4">
                                <h1 className="text-lg border-b border-white uppercase italic">Pieu Store</h1>
                                <div className="mt-4">
                                    <label>Email</label>
                                    <input type="email" name='email' placeholder='Enter email' className="mt-2 p-2 bg-gray-200 rounded border border-gray-400 w-full"/>
                                </div>
                                <div className="mt-4">
                                    <label>Password</label>
                                    <input type="password" name='password' placeholder='Enter password' className="mt-2 p-2 bg-gray-200 rounded border border-gray-400 w-full"/>
                                </div>
                                <div className="mt-4">
                                    <input type="submit" className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
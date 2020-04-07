import React from 'react'
import CommonConstants from '../config/CommonConstants'
import {useTurnOnOffLoader} from '../hooks/HookManager'

export default function ConfirmInfo (props) {
    useTurnOnOffLoader()
    // const INITIAL = {firstname: '', midname: '', lastname: '', phone: '', address: ''}
    // const {userInputs, handleChange, handleSubmitInfo} = useConfirmInfo(INITIAL)
    return (
        <div className="main">
            <section className="module bg-dark-30 about-page-header" style={{ backgroundImage: `url(${CommonConstants.IMAGES_DIR + CommonConstants.CONFIRM_INFO_BG})` }}>
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
                        <div className="col-sm-6">
                            <h4 className="font-alt">User Info</h4><br />
                            <form role="form">
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="name">First Name</label>
                                    <input className="form-control" type="text" id="name" name="name" placeholder="Your Name*" required="required" data-validation-required-message="Please enter your name." />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="email">Email</label>
                                    <input className="form-control" type="email" id="email" name="email" placeholder="Your Email*" required="required" data-validation-required-message="Please enter your email address." />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" rows="7" id="message" name="message" placeholder="Your Message*" required="required" data-validation-required-message="Please enter your message."></textarea>
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-block btn-round btn-d" id="cfsubmit" type="submit">Submit</button>
                                </div>
                            </form>
                            <div className="ajax-response font-alt" id="contactFormResponse"></div>
                        </div>
                        <div className="col-sm-6">
                            <h4 className="font-alt">Additional info</h4><br />
                            <p>I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend.</p>
                            <hr />
                            <h4 className="font-alt">Business Hours</h4><br />
                            <ul className="list-unstyled">
                                <li>Mo - Fr: 8am to 6pm</li>
                                <li>Sa, Su: 10am to 2pm</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

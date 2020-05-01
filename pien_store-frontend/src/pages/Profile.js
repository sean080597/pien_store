import React, { useRef } from 'react'
import {useSelector} from 'react-redux'
import {useTurnOnOffLoader, useUserProfile, useShopCart} from '../hooks/HookManager'
import {Modal} from '../components/ComponentsManager'

export default function Profile(props) {
    useTurnOnOffLoader()
    useShopCart({}, 'PROFILE_COMPONENT')
    //modal ref
    const modalRef = useRef()
    const openModal = () => {
        modalRef.current.openModal()
    }
    const closeModal = () => {
        modalRef.current.closeModal()
    }

    //user profile state
    const {userProfileDetails} = useSelector(state => ({
        userProfileDetails: state.auth.profile
    }))
    const userFullname = (userProfileDetails.firstname ? userProfileDetails.firstname : '') + (userProfileDetails.lastname ? (' ' + userProfileDetails.lastname) : '')
    const INITIAL_STATE = {firstname: '', lastname: '', gender: '1', phone: '', address: ''}
    const {userInputs, handleChange, handleSubmitInfo} = useUserProfile(INITIAL_STATE, modalRef)
    const isSubmitDisabled = !(userInputs.firstname && userInputs.lastname && userInputs.address && userInputs.phone)

    return (
        <div className="main">
            <section className="module-small">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <div className="row m-0 flex-display vertical-center">
                                <h4 className="font-alt mb-0"><strong>My Profile</strong></h4>
                                <button className="btn btn-b btn-round btn-xs ml-10 small-text" type="button" onClick={openModal}><i className="fa fa-edit"></i> Edit</button>
                            </div>
                            <hr className="divider-w mt-10 mb-20"/>
                            <div className="row flex-display">
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <div className="features-item">
                                        <div className="features-icon"><span className="fa fa-id-card"></span></div>
                                        <h3 className="features-title font-alt"><strong>Profile</strong></h3>
                                        <h5><strong>Fullname</strong>: {userFullname}</h5>
                                        <h5><strong>Email</strong>: {userProfileDetails.email}</h5>
                                        <h5><strong>Gender</strong>: {userProfileDetails.gender === 0 ? 'Female' : 'Male'}</h5>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <div className="features-item">
                                        <div className="features-icon"><span className="fa fa-at"></span></div>
                                        <h3 className="features-title font-alt"><strong>Address</strong></h3>
                                        <h5><strong>Address</strong>: {userProfileDetails.address}</h5>
                                        <h5><strong>Phone</strong>: {userProfileDetails.phone}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal ref={modalRef} modalWidth="40%">
                <h4 className="font-alt mb-0">User Information</h4>
                <hr className="divider-w mt-10 mb-20"/>
                <form className="form" onSubmit={handleSubmitInfo}>
                  <div className="form-group">
                    <div className="row form-group-input flex-display">
                        <input className="form-control" id="firstname" type="text" name="firstname" placeholder="Enter first name"
                        onChange={handleChange} value={userInputs.firstname}/>
                        <input className="form-control" id="lastname" type="text" name="lastname" placeholder="Enter last name"
                        onChange={handleChange} value={userInputs.lastname}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row form-group-input flex-display">
                        <select className="form-control" name="gender" onChange={handleChange} value={userInputs.gender}>
                            <option value="1" defaultValue>Male</option>
                            <option value="0" >Female</option>
                        </select>
                        <input className="form-control" id="phone" type="text" pattern="[0-9]*" name="phone" placeholder="Enter phone" maxLength="10"
                        onChange={handleChange} value={userInputs.phone}/>
                    </div>
                  </div>
                  <div className="form-group flex-display">
                    <input className="form-control" id="address" type="text" name="address" placeholder="Enter address"
                    onChange={handleChange} value={userInputs.address}/>
                  </div>
                  <hr className="divider-w mt-10 mb-20"/>
                  <div className="form-group row form-group-input flex-display">
                    <button className="btn btn-b btn-round m" type="submit" disabled={isSubmitDisabled}>Submit</button>
                    <button className="btn btn-b btn-round m" type="button" onClick={closeModal}>Close</button>
                  </div>
                </form>
            </Modal>
        </div>
    )
}

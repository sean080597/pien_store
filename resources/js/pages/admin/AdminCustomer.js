import React, {useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminActions } from '../../hooks/HookManager'
import { ReactTable, Modal, PagePagination } from '../../components/ComponentsManager'

export default function AdminCustomer(props) {
  // modal ref
  const modalRef = useRef()
  const openModal = () => { modalRef.current.openModal() }
  const closeModal = () => { modalRef.current.closeModal() }
  // hooks
  useInitializePageAdmin('customer')
  const INITIAL = {firstname: '', lastname: '', gender: 'M', phone: '', address: '', email: ''}
  const formFields = ['firstname', 'lastname', 'gender', 'phone', 'address', 'email']
  const {userInputs, errors, handleChange, handleBlur, handlePaginate, modalTitle, isEditing, isDeleting, isSubmitDisabled,
    handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete, handleRefresh} = useAdminActions(INITIAL, formFields, modalRef, 'customer')
  // data
  const {lsUsers, lsRoles} = useSelector(state => ({
    lsUsers: state.admin.lsObjsManagerment,
    lsRoles: state.admin.lsRoles
  }))
  const columns = useMemo(() => [
    {Header: 'First Name', accessor: "firstname"},
    {Header: 'Last Name', accessor: "lastname"},
    {Header: 'Gender', accessor: "genderName"},
    {Header: 'Email', accessor: "email"},
    {Header: 'Address', accessor: "address"},
    {Header: 'Type', accessor: "loginType"},
    {Header: 'Phone', accessor: "phone"},
    {Header: 'Action'},
  ], [])

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-12 admin-title">
          <h3 className="font-alt">User Managerment</h3>
          <button className="btn btn-b btn-round pull-right" type="button" onClick={handleOpenCreate}><i className="fa fa-plus-circle"></i> Create</button>
          <button className="btn btn-b btn-neutral pull-right mr-3" type="button" onClick={handleRefresh}><i className="fa fa-refresh"></i> Refresh</button>
        </div>
        <div className="col-sm-12 table-responsive">
          {
            lsUsers.length > 0 &&
            <ReactTable columns={columns} data={lsUsers} hasAction={true}
              tblClassName="table table-striped table-bordered table-bordered"
              handleEdit={handleOpenEdit} handleDel={handleOpenDelete}
            ></ReactTable>
          }
          <PagePagination isShow="true" handlePaginate={handlePaginate}/>
        </div>
      </div>
      <Modal ref={modalRef} modalWidth="50%">
        <div className="p-4 pb-5">
          <h4 className="font-alt mb-0">{modalTitle}</h4>
          <hr className="divider-w mt-10 mb-20"/>
          {
            // Edit Modal
            !isDeleting &&
            <form className="form" onSubmit={isEditing ? handleSubmitEdit : handleSubmitCreate}>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input className="form-control" id="firstname" type="text" name="firstname" placeholder="Enter first name" maxLength="32"
                    onChange={handleChange} value={userInputs.firstname}/>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <input className="form-control" id="lastname" type="text" name="lastname" placeholder="Enter last name" maxLength="32"
                    onChange={handleChange} value={userInputs.lastname}/>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select className="form-control" id="gender" name="gender" onChange={handleChange} value={userInputs.gender}>
                      <option value='M'>Male</option>
                      <option value='F'>Female</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" id="email" type="email" name="email" placeholder="Enter email" maxLength="100"
                    value={userInputs.email} disabled/>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input className="form-control" id="phone" type="number" pattern="[0-9]*" name="phone" placeholder="Enter phone" maxLength="10"
                    onChange={handleChange} value={userInputs.phone}/>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input className="form-control" id="address" type="text" name="address" placeholder="Enter address"
                    onChange={handleChange} value={userInputs.address}/>
                  </div>
                </div>
              </div>
              <hr className="divider-w mt-20"/>
              <div className="row mt-20">
                <div className="col-sm-3 col-sm-offset-3">
                  <button className="btn btn-b btn-round btn-fw" type="submit" disabled={isSubmitDisabled}>Submit</button>
                </div>
                <div className="col-sm-3">
                  <button className="btn btn-b btn-round btn-fw" type="button" onClick={closeModal}>Close</button>
                </div>
              </div>
            </form>
          }
          {
            // Delete Modal
            isDeleting &&
            <form className="form" onSubmit={handleSubmitDelete}>
              <h5 className="font-alt">Do you want to delete this?</h5>
              <hr className="divider-w mt-20 mb-20"/>
              <div className="row">
                <div className="col-sm-3 col-sm-offset-3">
                  <button className="btn btn-b btn-round btn-fw" type="submit">Yes</button>
                </div>
                <div className="col-sm-3">
                  <button className="btn btn-b btn-round btn-fw" type="button" onClick={closeModal}>No</button>
                </div>
              </div>
            </form>
          }
        </div>
      </Modal>
    </section>
  )
}

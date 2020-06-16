import React, {useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminActions } from '../../hooks/HookManager'
import { ReactTable, Modal } from '../../components/ComponentsManager'

export default function AdminUser(props) {
  // modal ref
  const modalRef = useRef()
  const openModal = () => { modalRef.current.openModal() }
  const closeModal = () => { modalRef.current.closeModal() }
  // hooks
  const {lsRoles} = useInitializePageAdmin('user')
  const INITIAL = {modalTitle: '', id: '', isEditing: false, isDeleting: false, firstname: '', lastname: '', gender: 'M', phone: '', address: '', email: '', role_id: ''}
  const formFields = ['firstname', 'lastname', 'gender', 'phone', 'address', 'email', 'role_id']
  const {userInputs, handleChange, handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete} = useAdminActions(INITIAL, formFields, modalRef, 'user')
  const isSubmitDisabled = !(userInputs.firstname && userInputs.lastname && userInputs.address && userInputs.phone)
  // data
  const {lsUsers} = useSelector(state => ({
    lsUsers: state.admin.lsObjsManagerment
  }))
  const columns = useMemo(() => [
    {Header: 'First Name', accessor: "firstname"},
    {Header: 'Last Name', accessor: "lastname"},
    {Header: 'Gender', accessor: "genderName"},
    {Header: 'Email', accessor: "email"},
    {Header: 'Address', accessor: "address"},
    {Header: 'Role', accessor: "rolename"},
    {Header: 'Phone', accessor: "phone"},
    {Header: 'Action'},
  ], [])

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="font-alt">User Managerment</h3>
        </div>
        <div className="col-sm-12 table-responsive">
          <ReactTable columns={columns} data={lsUsers} hasAction={true}
            tblClassName="table table-striped table-bordered table-bordered"
            handleEdit={handleOpenEdit} handleDel={handleOpenDelete}
          ></ReactTable>
        </div>
      </div>
      <Modal ref={modalRef} modalWidth="50%">
        <h4 className="font-alt mb-0">{userInputs.modalTitle}</h4>
        <hr className="divider-w mt-10 mb-20"/>
        {
          // Edit Modal
          !userInputs.isDeleting &&
          <form className="form" onSubmit={userInputs.isEditing ? handleSubmitEdit : handleSubmitCreate}>
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
                      <option value='M'>Male</option>
                      <option value='F'>Female</option>
                  </select>
                  <input className="form-control" id="phone" type="text" pattern="[0-9]*" name="phone" placeholder="Enter phone" maxLength="10"
                  onChange={handleChange} value={userInputs.phone}/>
              </div>
            </div>
            <div className="form-group">
              <div className="row form-group-input flex-display">
                  <select className="form-control" name="role_id" onChange={handleChange} value={userInputs.role_id}>
                    {
                      lsRoles.length > 0 &&
                      lsRoles.map((role, i) =>
                        <option value={role.id} key={role.id}>{role.name}</option>
                      )
                    }
                  </select>
                  <input className="form-control" id="email" type="text" name="email" placeholder="Enter email" maxLength="100"
                  onChange={handleChange} value={userInputs.email}/>
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
        }
        {
          // Delete Modal
          userInputs.isDeleting &&
          <form className="form" onSubmit={handleSubmitDelete}>
            <h5 className="font-alt">Do you want to delete this?</h5>
            <hr className="divider-w mt-10 mb-20"/>
            <div className="form-group row form-group-input flex-display">
              <button className="btn btn-b btn-round m" type="submit">Yes</button>
              <button className="btn btn-b btn-round m" type="button" onClick={closeModal}>No</button>
            </div>
          </form>
        }
      </Modal>
    </section>
  )
}

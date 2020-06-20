import React, {useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminActions } from '../../hooks/HookManager'
import { ReactTable, Modal, CustomInput } from '../../components/ComponentsManager'

export default function AdminUser(props) {
  // modal ref
  const modalRef = useRef()
  const openModal = () => { modalRef.current.openModal() }
  const closeModal = () => { modalRef.current.closeModal() }
  // hooks
  const {lsRoles} = useInitializePageAdmin('user')
  const INITIAL = {firstname: '', lastname: '', gender: 'M', phone: '', address: '', email: '', role_id: '', password: '', emailError: ''}
  const formFields = ['firstname', 'lastname', 'gender', 'phone', 'address', 'email', 'role_id', 'password']
  const {userInputs, modalTitle, isEditing, isDeleting, isSubmitDisabled,
    handleChange, handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete} = useAdminActions(INITIAL, formFields, modalRef, 'user')
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
        <div className="col-sm-12 admin-title">
          <h3 className="font-alt">User Managerment</h3>
          <button className="btn btn-b btn-round pull-right" type="button" onClick={handleOpenCreate}>Create</button>
        </div>
        <div className="col-sm-12 table-responsive">
          <ReactTable columns={columns} data={lsUsers} hasAction={true}
            tblClassName="table table-striped table-bordered table-bordered"
            handleEdit={handleOpenEdit} handleDel={handleOpenDelete}
          ></ReactTable>
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
              <div className="form-group">
                <div className="flex-display form-group-input">
                    <CustomInput className="form-control" id="firstname" type="text" name="firstname" placeholder="Enter first name" maxLength="32"
                    onChange={handleChange} value={userInputs.firstname}/>
                    <CustomInput className="form-control" id="lastname" type="text" name="lastname" placeholder="Enter last name" maxLength="32"
                    onChange={handleChange} value={userInputs.lastname}/>
                    <div>
                      <select className="form-control" name="gender" onChange={handleChange} value={userInputs.gender}>
                          <option value='M'>Male</option>
                          <option value='F'>Female</option>
                      </select>
                    </div>
                </div>
              </div>
              <div className="form-group">
                <div className="flex-display form-group-input">
                    <CustomInput className="form-control" id="email" type="email" name="email" placeholder="Enter email" maxLength="100"
                    onChange={handleChange} value={userInputs.email} inputError={userInputs.emailError}/>
                    <CustomInput className="form-control" id="password" type="password" name="password" placeholder="Enter password" maxLength="32"
                    onChange={handleChange} value={userInputs.password}/>
                    <CustomInput className="form-control" id="phone" type="number" pattern="[0-9]*" name="phone" placeholder="Enter phone" maxLength="10"
                    onChange={handleChange} value={userInputs.phone}/>
                </div>
              </div>
              <div className="form-group">
                <div className="flex-display form-group-input">
                  <div className="col-sm-4">
                    <select className="form-control col-sm-3" name="role_id" onChange={handleChange} value={userInputs.role_id}>
                      {
                        lsRoles.length > 0 &&
                        lsRoles.map((role, i) =>
                          <option value={role.id} key={role.id}>{role.name}</option>
                        )
                      }
                    </select>
                  </div>
                  <div className="col-sm-8">
                    <CustomInput className="form-control" id="address" type="text" name="address" placeholder="Enter address"
                    onChange={handleChange} value={userInputs.address}/>
                  </div>
                </div>
              </div>
              <hr className="divider-w mt-20 mb-20"/>
              <div className="row">
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
              <div className="form-group row form-group-input flex-display mt-5">
                <button className="btn btn-b btn-round" type="submit">Yes</button>
                <button className="btn btn-b btn-round" type="button" onClick={closeModal}>No</button>
              </div>
            </form>
          }
        </div>
      </Modal>
    </section>
  )
}

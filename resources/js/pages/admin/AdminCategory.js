import React, {useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminActions, useCommonService } from '../../hooks/HookManager'
import { ReactTable, Modal, PagePagination } from '../../components/ComponentsManager'
import _ from 'lodash'

export default function AdminCategory(props) {
  const CommonService = useCommonService()
  // modal ref
  const modalRef = useRef()
  const openModal = () => { modalRef.current.openModal() }
  const closeModal = () => { modalRef.current.closeModal() }
  // file upload ref
  const fileInput = useRef()
  // hooks
  useInitializePageAdmin('category')
  const INITIAL = {cateId: '', name: '', input_image: '', origin_image: ''}
  const formFields = ['cateId', 'name', 'input_image']
  const {userInputs, errors, handleChange, handleBlur, handlePaginate, modalTitle, isEditing, isDeleting, isSubmitDisabled,
    handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete, handleRefresh,
    handleSelectedFile} = useAdminActions(INITIAL, formFields, modalRef, 'category')
  // data
  const {lsCategories} = useSelector(state => ({
    lsCategories: state.admin.lsObjsManagerment
  }))
  const columns = useMemo(() => [
    {Header: 'ID', accessor: "id"},
    {Header: 'Name', accessor: "name"},
    {Header: 'Action'},
  ], [])


  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-12 admin-title">
          <h3 className="font-alt">Category Managerment</h3>
          <button className="btn btn-b btn-round pull-right" type="button" onClick={handleOpenCreate}><i className="fa fa-plus-circle"></i> Create</button>
          <button className="btn btn-b btn-neutral pull-right mr-3" type="button" onClick={handleRefresh}><i className="fa fa-refresh"></i> Refresh</button>
        </div>
        <div className="col-sm-12 table-responsive">
          {
            lsCategories.length > 0 &&
            <ReactTable columns={columns} data={lsCategories} hasEdit={true} hasDelete={true}
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
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="cateId">CateID</label>
                    <input className="form-control" id="cateId" type="text" name="cateId" placeholder="Enter category id" maxLength="10"
                    onChange={handleChange} value={userInputs.cateId}/>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" id="name" type="text" name="name" placeholder="Enter category name" maxLength="100"
                    onChange={handleChange} value={userInputs.name}/>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="col-sm-6 mb-4">
                  <div className="upload-product-container">
                    <label htmlFor="cateImg">Category Image</label>
                    <div className="upload-action">
                      <img src={CommonService.generateImageSrc('categories', null, userInputs.input_image)}/>
                      <input id="cateImg" type="file" onChange={handleSelectedFile} ref={fileInput}/>
                      <button type="button" className="btn btn-neutral btn-round" onClick={() => fileInput.current.click()}>Choose Image</button>
                    </div>
                    <h6>Filename: {(fileInput.current && fileInput.current.files[0]) ? fileInput.current.files[0].name : 'No file chosen'}</h6>
                  </div>
                </div>
              </div>
              <hr className="divider-w mt-10"/>
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

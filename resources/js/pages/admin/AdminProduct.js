import React, {useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminActions } from '../../hooks/HookManager'
import { ReactTable, Modal, PagePagination } from '../../components/ComponentsManager'
import _ from 'lodash'
import CommonService from '../../services/CommonService.service'

export default function AdminProduct(props) {
  // modal ref
  const modalRef = useRef()
  const openModal = () => { modalRef.current.openModal() }
  const closeModal = () => { modalRef.current.closeModal() }
  // file upload ref
  const fileInput = useRef()
  // hooks
  useInitializePageAdmin('product')
  const INITIAL = {name: '', price: '', description: '', origin: '', category_id: '', input_image: '', origin_image: ''}
  const formFields = ['name', 'price', 'description', 'origin', 'category_id', 'input_image']
  const {userInputs, errors, handleChange, handleBlur, handlePaginate, modalTitle, isEditing, isDeleting, isSubmitDisabled,
    handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete, handleRefresh,
    handleSelectedFile} = useAdminActions(INITIAL, formFields, modalRef, 'product')
  // data
  const {lsProducts, lsCategories} = useSelector(state => ({
    lsProducts: state.admin.lsObjsManagerment,
    lsCategories: state.admin.lsCategories
  }))
  const columns = useMemo(() => [
    {Header: 'Name', accessor: "name"},
    {Header: 'Price', accessor: "price", Cell: props => <>{CommonService.formatMoney(props.value, 0)}</>},
    {Header: 'Desc', accessor: "description", Cell: props => <>{_.truncate(props.value, {length: 100})}</>},
    {Header: 'Origin', accessor: "origin"},
    {Header: 'Category', accessor: "category_name"},
    {Header: 'Action'},
  ], [])


  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-12 admin-title">
          <h3 className="font-alt">Product Managerment</h3>
          <button className="btn btn-b btn-round pull-right" type="button" onClick={handleOpenCreate}><i className="fa fa-plus-circle"></i> Create</button>
          <button className="btn btn-b btn-neutral pull-right mr-3" type="button" onClick={handleRefresh}><i className="fa fa-refresh"></i> Refresh</button>
        </div>
        <div className="col-sm-12 table-responsive">
          {
            lsProducts.length > 0 &&
            <ReactTable columns={columns} data={lsProducts} hasEdit={true} hasDelete={true}
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
                    <label htmlFor="firstname">Name</label>
                    <input className="form-control" id="name" type="text" name="name" placeholder="Enter name" maxLength="150"
                    onChange={handleChange} value={userInputs.name}/>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="phone">Price</label>
                    <input className="form-control" id="price" type="number" pattern="[0-9]*" name="price" placeholder="Enter price" maxLength="12"
                    onChange={handleChange} value={userInputs.price}/>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select className="form-control col-sm-3" id="category" name="category_id" onChange={handleChange} value={userInputs.category_id}>
                      {
                        lsCategories.length > 0 &&
                        lsCategories.map((item, i) =>
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )
                      }
                    </select>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="phone">Origin</label>
                    <input className="form-control" id="origin" type="text" name="origin" placeholder="Enter origin" maxLength="50"
                    onChange={handleChange} value={userInputs.origin}/>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="col-sm-6">
                  <div className="upload-product-container">
                    <label htmlFor="productImg">Product Image</label>
                    <div className="upload-action">
                      <img src={CommonService.generateImageSrc('products', null, userInputs.input_image)}/>
                      <input id="productImg" type="file" onChange={handleSelectedFile} ref={fileInput}/>
                      <button type="button" className="btn btn-neutral btn-round" onClick={() => fileInput.current.click()}>Choose Image</button>
                    </div>
                    <h6>Filename: {(fileInput.current && fileInput.current.files[0]) ? fileInput.current.files[0].name : 'No file chosen'} - Max size: 2Mb - Dimensions: 665x750</h6>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="description" placeholder="Enter description" rows="7"
                    onChange={handleChange} value={userInputs.description}/>
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

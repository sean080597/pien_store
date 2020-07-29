import React, {useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminProductService, useCommonService } from '../../hooks/HookManager'
import { ReactTable, Modal, PagePagination, SearchBox } from '../../components/ComponentsManager'
import _ from 'lodash'

export default function AdminProduct(props) {
  const CommonService = useCommonService()
  const curType = 'product'
  // modal ref
  const modalRef = useRef()
  const openModal = () => { modalRef.current.openModal() }
  const closeModal = () => { modalRef.current.closeModal() }
  // file upload ref
  const fileInput = useRef()
  // hooks
  useInitializePageAdmin(curType)
  const {handlePaginate, modalTitle, isDeleting, handleOpenDelete, handleSubmitDelete, handleRefresh, handleOpenProductDetails, handleSearch} = useAdminProductService(modalRef, curType)
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
          <button className="btn btn-b btn-round pull-right" type="button" onClick={() => handleOpenProductDetails('create')}><i className="fa fa-plus-circle"></i> Create</button>
          <button className="btn btn-b btn-neutral pull-right mr-3" type="button" onClick={handleRefresh}><i className="fa fa-refresh"></i> Refresh</button>
        </div>
        <div className="col-sm-12">
          <SearchBox handleSearch={handleSearch}/>
        </div>
        <div className="col-sm-12 table-responsive">
          {
            lsProducts.length > 0 &&
            <ReactTable columns={columns} data={lsProducts}
              tblClassName="table table-striped table-bordered table-bordered"
              hasEditInAnotherView={true} handleAnotherView={handleOpenProductDetails}
              hasDelete={true} handleDel={handleOpenDelete}
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

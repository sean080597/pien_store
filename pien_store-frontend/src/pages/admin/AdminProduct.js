import React, {useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminActions } from '../../hooks/HookManager'
import { ReactTable, Modal, PagePagination } from '../../components/ComponentsManager'

export default function AdminProduct(props) {
  // modal ref
  const modalRef = useRef()
  const openModal = () => { modalRef.current.openModal() }
  const closeModal = () => { modalRef.current.closeModal() }
  // hooks
  useInitializePageAdmin('product')
  const INITIAL = {name: '', price: '', description: '', origin: '', category_id: ''}
  const formFields = ['name', 'price', 'description', 'origin', 'category_id']
  const {userInputs, errors, handleChange, handleBlur, handlePaginate, modalTitle, isEditing, isDeleting, isSubmitDisabled,
    handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete, handleRefresh} = useAdminActions(INITIAL, formFields, modalRef, 'product')
  // data
  const {lsProducts, lsCategories} = useSelector(state => ({
    lsProducts: state.admin.lsObjsManagerment,
    lsCategories: state.admin.lsCategories
  }))
  const columns = useMemo(() => [
    {Header: 'Name', accessor: "name"},
    {Header: 'Price', accessor: "price"},
    {Header: 'Desc', accessor: "description"},
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
            <ReactTable columns={columns} data={lsProducts} hasAction={true}
              tblClassName="table table-striped table-bordered table-bordered"
              handleEdit={handleOpenEdit} handleDel={handleOpenDelete}
            ></ReactTable>
          }
          <PagePagination isShow="true" handlePaginate={handlePaginate}/>
        </div>
      </div>
    </section>
  )
}

import React, { useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminActions, useAdminService } from '../../hooks/HookManager'
import { ReactTable, Modal, PagePagination } from '../../components/ComponentsManager'
import _ from 'lodash'

export default function AdminOrder(props) {
  const AdminService = useAdminService()
  // modal ref
  const modalRef = useRef()
  const openModal = () => { modalRef.current.openModal() }
  const closeModal = () => { modalRef.current.closeModal() }
  // hooks
  useInitializePageAdmin('order')
  const INITIAL = {status: ''}
  const formFields = ['status']
  const { userInputs, modalTitle, isSubmitDisabled, handleChange, handlePaginate, handleOpenAnotherView, handleOpenEdit, handleSubmitEdit, handleRefresh } = useAdminActions(INITIAL, formFields, modalRef, 'order')
  // data
  const { lsOrders } = useSelector(state => ({
    lsOrders: state.admin.lsObjsManagerment
  }))
  const columns = useMemo(() => [
    { Header: 'STT', Cell: props => <>{props.cell.row.index+1}</> },
    { Header: 'First Name', accessor: "firstname" },
    { Header: 'Last Name', accessor: "lastname" },
    { Header: 'Address', accessor: "address" },
    { Header: 'Phone', accessor: "phone" },
    { Header: 'Status', accessor: "status" },
    { Header: 'Action' },
  ], [])

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-12 admin-title">
          <h3 className="font-alt">Order Managerment</h3>
          <button className="btn btn-b btn-neutral pull-right mr-3" type="button" onClick={handleRefresh}><i className="fa fa-refresh"></i> Refresh</button>
        </div>
        <div className="col-sm-12 table-responsive">
          {
            lsOrders.length > 0 &&
            <ReactTable columns={columns} data={lsOrders} hasView={true} hasEdit={true} redirectDest="order-details"
              tblClassName="table table-striped table-bordered table-bordered"
              handleView={handleOpenAnotherView} handleEdit={handleOpenEdit}
            ></ReactTable>
          }
          <PagePagination isShow="true" handlePaginate={handlePaginate} />
        </div>
      </div>
      <Modal ref={modalRef} modalWidth="max-content">
        <div className="p-4 pb-5">
          <h4 className="font-alt mb-0">{modalTitle}</h4>
          <hr className="divider-w mt-10 mb-20"/>
          {
            // Edit Modal
            <form className="form" onSubmit={handleSubmitEdit}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select className="form-control col-sm-3" id="status" name="status" onChange={handleChange} value={userInputs.status}>
                      {
                        AdminService.lsOrderStatus.map((item, i) => <option value={item} key={item}>{item}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              <hr className="divider-w mt-10"/>
              <div className="row mt-20">
                <div className="col-sm-6">
                  <button className="btn btn-b btn-round btn-fw" type="submit" disabled={isSubmitDisabled}>Submit</button>
                </div>
                <div className="col-sm-6">
                  <button className="btn btn-b btn-round btn-fw" type="button" onClick={closeModal}>Close</button>
                </div>
              </div>
            </form>
          }
        </div>
      </Modal>
    </section>
  )
}

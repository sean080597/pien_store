import React, { useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminActions } from '../../hooks/HookManager'
import { ReactTable, Modal, PagePagination } from '../../components/ComponentsManager'
import _ from 'lodash'

export default function AdminOrder(props) {
  // hooks
  useInitializePageAdmin('order')
  const { handlePaginate, handleOpenAnotherView, handleOpenDelete, handleRefresh} = useAdminActions(null, null, null, 'order')
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
            <ReactTable columns={columns} data={lsOrders} hasView={true} hasDelete={true} redirectDest="order-details"
              tblClassName="table table-striped table-bordered table-bordered"
              handleView={handleOpenAnotherView} handleDel={handleOpenDelete}
            ></ReactTable>
          }
          <PagePagination isShow="true" handlePaginate={handlePaginate} />
        </div>
      </div>
    </section>
  )
}

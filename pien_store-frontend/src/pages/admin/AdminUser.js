import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminUser } from '../../hooks/HookManager'
import { ReactTable } from '../../components/ComponentsManager'

export default function AdminUser(props) {
  useInitializePageAdmin('user')
  const {handleEdit, handleDel} = useAdminUser()
  const {lsUsers} = useSelector(state => ({
    lsUsers: state.admin.lsObjsManagerment
  }))
  const columns = useMemo(() => [
    {Header: 'First Name', accessor: "firstname"},
    {Header: 'Last Name', accessor: "lastname"},
    {Header: 'Gender', accessor: "gender"},
    {Header: 'Email', accessor: "email"},
    {Header: 'Address', accessor: "address"},
    {Header: 'Role', accessor: "role"},
    {Header: 'Phone', accessor: "phone"},
    {Header: 'Action', Cell: ({row}) => (
      <div className="flex-display-noWrap btn-action-admin">
        <button className="btn-b btn btn-round" title="Edit User" onClick={() => handleEdit(row.index)}>
          <i className="fa fa-edit"></i>
        </button>
        <button className="btn-danger btn btn-round" title="Delete User" onClick={() => handleDel(row.index)}>
          <i className="fa fa-times"></i>
        </button>
      </div>
    )},
  ], [])

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="font-alt">User Managerment</h3>
        </div>
        <div className="col-sm-12 table-responsive">
          <ReactTable columns={columns} data={lsUsers}
            tblClassName="table table-striped table-bordered table-bordered"
          ></ReactTable>
        </div>
      </div>
    </section>
  )
}

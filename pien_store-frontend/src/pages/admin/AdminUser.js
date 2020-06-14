import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useInitializePageAdmin, useAdminUser } from '../../hooks/HookManager'
import { ReactTable } from '../../components/ComponentsManager'

export default function AdminUser(props) {
  useInitializePageAdmin('user')
  // useAdminUser()
  const {lsUsers} = useSelector(state => ({
    lsUsers: state.admin.lsObjsManagerment
  }))
  const columns = useMemo(() => [
    {Header: 'User ID', accessor: "id"},
    {Header: 'First Name', accessor: "firstname"},
    {Header: 'Last Name', accessor: "lastname"},
    {Header: 'Gender', accessor: "gender"},
    {Header: 'Email', accessor: "email"},
    {Header: 'Address', accessor: "address"},
    {Header: 'Birthday', accessor: "birthday"},
    {Header: 'Role', accessor: "role_id"},
    {Header: 'Phone', accessor: "phone"},
  ], [])

  return (
    <section className="container-fluid">
      <div className="row">
        <ReactTable columns={columns} data={lsUsers}></ReactTable>
      </div>
    </section>
  )
}

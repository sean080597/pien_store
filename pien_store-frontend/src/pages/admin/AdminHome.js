import React from 'react'
import { useInitializePageAdmin } from '../../hooks/HookManager'
import { useAdminHome } from '../../hooks/HookManager'
import AreaChart from '../../plugins/charts/AreaChart'

export default function AdminHome(props) {
  useInitializePageAdmin('ADMIN_HOME')
  useAdminHome()

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-5">
          <AreaChart />
        </div>
        <div className="col-sm-5 col-sm-offset-1">
          <AreaChart />
        </div>
        <div className="col-sm-5">
          <AreaChart />
        </div>
        <div className="col-sm-5 col-sm-offset-1">
          <AreaChart />
        </div>
        <div className="col-sm-5">
          <AreaChart />
        </div>
        <div className="col-sm-5 col-sm-offset-1">
          <AreaChart />
        </div>
      </div>
    </section>
  )
}

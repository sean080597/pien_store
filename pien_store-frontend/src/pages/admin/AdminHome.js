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
        <div className="col-sm-6 col-md-5 col-lg-4">
          <AreaChart />
        </div>
        <div className="col-sm-6 col-md-5 col-md-offset-1 col-lg-4 col-lg-offset-0">
          <AreaChart />
        </div>
        <div className="col-sm-6 col-md-5 col-lg-4">
          <AreaChart />
        </div>
        <div className="col-sm-6 col-md-5 col-md-offset-1 col-lg-4 col-lg-offset-0">
          <AreaChart />
        </div>
        <div className="col-sm-12">
          <h3>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </h3>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import {useInitializePageAdmin} from '../../hooks/HookManager'
import { Link } from 'react-router-dom'
import {useAdminHome} from '../../hooks/HookManager'

export default function AdminHome(props) {
    useInitializePageAdmin('ADMIN_HOME')
    useAdminHome()

    return (
        <div>
            <h1>Admin Home</h1>
            <Link className="btn btn-round btn-b" to="/admin-su/login">Test</Link>
        </div>
    )
}

import React from 'react'
import {useTurnOnOffLoader} from '../hooks/HookManager'

export default function Profile(props) {
    useTurnOnOffLoader()
    return (
        <div>
            <h1>Profile page</h1>
        </div>
    )
}

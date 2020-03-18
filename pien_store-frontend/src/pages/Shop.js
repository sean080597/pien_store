import React from 'react'
import {useTurnOnOffLoader} from '../hooks/HookManager'

export default function Shop(props) {
    useTurnOnOffLoader()
    return (
        <div>
            <h1>Shop page</h1>
        </div>
    )
}

import React from 'react'
import {useTurnOnOffLoader} from '../hooks/HookManager'

export default function About(props) {
    useTurnOnOffLoader()
    return (
        <div>
            <h1>About page</h1>
        </div>
    )
}

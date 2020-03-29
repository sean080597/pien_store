import React from 'react'
import {usePromiseTracker} from 'react-promise-tracker'

export default function LoadingIndicator() {
    const { promiseInProgress } = usePromiseTracker({delay: 500})
    return (
        promiseInProgress &&
        <div className="page-loader">
            <div className="loader">Loading...</div>
        </div>
    )
}

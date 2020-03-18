import React from 'react'
import { Link } from 'react-router-dom';
import CommonConstants from '../config/CommonConstants.config'
import {useTurnOnOffLoader} from '../hooks/HookManager'

export default function NotFound() {
    useTurnOnOffLoader()
    return (
        <section className="home-section home-parallax home-fade home-full-height bg-dark bg-dark-30" style={{backgroundImage:`url(${CommonConstants.ERROR_BG})`}}>
            <div className="titan-caption">
                <div className="caption-content">
                    <div className="font-alt mb-30 titan-title-size-4">Error 404</div>
                    <div className="font-alt">The requested URL was not found on this server.<br />That is all we know.</div>
                    <div className="font-alt mt-30"><Link className="btn btn-border-w btn-round" to="/">Back to home page</Link></div>
                </div>
            </div>
        </section>
    )
}
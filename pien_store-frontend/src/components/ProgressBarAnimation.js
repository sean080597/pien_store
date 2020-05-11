import React, { useEffect } from 'react'
import $ from 'jquery'
import {CountUp} from 'countup.js'

export default function ProgressBarAnimation(props) {
    const pbType = props.pbType
    const pbListSteps = props.listSteps
    // handle
    const handleProgressBarAnimation = (elProgressBar) => {
        $(elProgressBar).ready(() => {
            var percent = $(elProgressBar).attr('aria-valuenow');
            $(elProgressBar).animate({'width' : percent + '%'});
            $(elProgressBar).find('span').animate({'opacity' : 1}, 900);
            const countUp = new CountUp('progress-bar-step', percent, { duration: 3 })
            if (!countUp.error) { countUp.start() }
            else { countUp.error(countUp.error) }
        })
    }

    useEffect(() => {
        window.addEventListener('load', handleProgressBarAnimation('.progress-bar'))
        return () => {
            window.removeEventListener('load', handleProgressBarAnimation('.progress-bar'))
        }
    }, [])

    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped active" aria-valuenow="90" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <span id="progress-bar-step" className="font-alt"></span>
            </div>
        </div>
    )
}

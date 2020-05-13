import React from 'react'

export default function ProgressBarSteps(props) {
    const lsSteps = props.lsSteps
    const curStep = props.curStep
    const generateClass = (stt, pos) => {
        // generate pseudo content
        let result = 'progress-steps--' + stt + (pos <= curStep ? '-active' : '') + ' text-capitalize'
        // generate status
        return result += (pos === curStep ? ' active' : (pos < curStep ? ' complete' : ''))
    }

    return (
        <ul className="progress-steps">
            {
                lsSteps.map((item, index) =>
                    <li className={generateClass(item, index)} key={index}>{item}</li>
                )
            }
        </ul>
    )
}

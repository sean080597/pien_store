import React from 'react'
import {useScreenWidth} from '../hooks/useScreenWidth'

export const withScreenWidthHOC = (Component) => {
    return (props) => {
        const screenWidth = useScreenWidth();
        return <Component width={screenWidth} {...props}/>
    }
}
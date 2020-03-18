import {useEffect, useState} from 'react'

export default function useScreenWidth(){
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(()=>{
        const handler = (event) => {
            setWidth(event.target.innerWidth)
        }

        window.addEventListener('resize', handler)

        return () => {
            window.removeEventListener('resize', handler)
        }
    }, [])

    return width;
}
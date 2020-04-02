import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'

export default function useConfirmInfo(initial) {
    const dispatch = useDispatch()

    const [userInputs, setUserInputs] = useState(initial)

    //handle
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserInputs({...userInputs, [name]: value})
    }

    const handleSubmitInfo = async (evt) => {
        evt.preventDefault();
        // await applyProductsFilter()
    }

    useEffect(() => {
        
        return () => {}
    }, [])
    return {userInputs, handleChange, handleSubmitInfo};
}

import { useEffect } from 'react'
import CommonService from '../../services/CommonService.service'
// import { useDispatch } from 'react-redux'

export default function useAdminUser() {
    // const dispatch = useDispatch()
    // handle
    const handleEdit = (index) => {
        console.log('edit index ==> ', index)
    }
    const handleDel = (index) => {
        console.log('delete index ==> ', index)
    }

    useEffect(() => {
        return () => {
            
        }
    }, [])
    return {handleEdit, handleDel};
}

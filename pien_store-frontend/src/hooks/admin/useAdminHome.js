import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import Cookie from 'js-cookie'
import {useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function useAdminHome() {
    // const dispatch = useDispatch()
    const history = useHistory()
    const token = Cookie.get('access_token')
    const {userRole} = useSelector(state => ({
        userRole: state.auth.user.role
    }))

    useEffect(() => {
        return () => {
            if (userRole === 'adm' && token) history.goBack()
        }
    }, [])
    return;
}

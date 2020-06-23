import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CommonService from '../../services/CommonService.service'
import CommonConstants from '../../config/CommonConstants'
import ConnectionService from '../../services/ConnectionService.service';
import AdminService from '../../services/AdminService.service';

const apiUrl = CommonConstants.API_URL;

export default function useAdminActions(initial, formFields, modalRef, curType) {
    const dispatch = useDispatch()
    const [userInputs, setUserInputs] = useState(initial)
    const [errors, setErrors] = useState({})
    const [modalTitle, setModalTitle] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const [itemId, setItemId] = useState()

    const {lsObjsManagerment} = useSelector(state => ({
        lsObjsManagerment: state.admin.lsObjsManagerment
    }))

    // handle events
    const handleChange = (evt) => {
        const {name, value, validity, type, maxLength} = evt.target
        const isValidInputVal = (type === 'number' && validity.valid) || type !== 'number'
        const isValidInputLength = (maxLength > 0 && value.length <= maxLength) || maxLength === -1 || maxLength === undefined
        if(isValidInputVal && isValidInputLength){
            setUserInputs({...userInputs, [name]: value})
        }
    }
    const handleBlur = () => {
        const validationErrors = AdminService.validateUserInputs(userInputs)
        setErrors(validationErrors)
    }

    // handle open modal
    const handleOpenCreate = () => {
        Object.keys(userInputs).map((key, index) => userInputs[key] = '')
        setUserInputs({...userInputs, gender: 'M', role_id: 'adm'})
        applyModalProperties(`Create ${curType}`, false, false)
        modalRef.current.openModal()
    }
    const handleOpenEdit = (inputInfo) => {
        setItemId(inputInfo.id)
        let editData = {...userInputs}
        formFields.forEach((key, i) => {
            editData[key] = inputInfo[key]
        })
        if(curType === 'user') editData['password'] = ''
        setUserInputs(editData)
        applyModalProperties(`Edit ${curType}`, true, false)
        modalRef.current.openModal()
    }
    const handleOpenDelete = (inputUserId) => {
        setItemId(inputUserId)
        applyModalProperties(`Delete ${curType}`, false, true)
        modalRef.current.openModal()
    }
    // handle submit
    const handleSubmitCreate = async (evt) => {
        evt.preventDefault()
        const apiQuery = `${apiUrl}/admin-${curType}/createData`
        let sendData = {}
        formFields.forEach(key => {
            sendData[key] = userInputs[key]
        })
        ConnectionService.axiosPostByUrlWithToken(apiQuery, sendData)
        .then(res => {
            if(!res.success && res.message.email) setErrors({...errors, email: res.message.email[0]})
            else setErrors({...errors, email: ''})
            AdminService.showMessage(res.success, 'user', 'Created', false, null)
            if(res.success){
                modalRef.current.closeModal()
            }
            CommonService.turnOffLoader()
        })
        .catch(res => {
            AdminService.showMessage(res.success, 'user', 'Created', false, null)
            CommonService.turnOffLoader()
        })
    }
    const handleSubmitEdit = async (evt) => {
        evt.preventDefault()
        const apiQuery = `${apiUrl}/admin-${curType}/editData/${itemId}`
        let sendData = {}
        formFields.forEach(key => {
            sendData[key] = userInputs[key]
        })
        console.log('before edit ==> ', JSON.stringify(lsObjsManagerment))
        ConnectionService.axiosPutByUrlWithToken(apiQuery, sendData)
        .then(res => {
            setErrors({...errors, email: (!res.success && res.message.email) ? res.message.email[0] : ''})
            AdminService.showMessage(res.success, 'user', 'Edited', false, null)
            if(res.success){
                modalRef.current.closeModal()
            }
            CommonService.turnOffLoader()
        })
        .catch(res => {
            AdminService.showMessage(res.success, 'user', 'Edited', false, null)
            CommonService.turnOffLoader()
        })
    }
    const handleSubmitDelete = async (evt) => {
        evt.preventDefault()
        const apiQuery = `${apiUrl}/admin-${curType}/deleteData/${itemId}`
        ConnectionService.axiosDeleteByUrlWithToken(apiQuery)
        .then(res => {
            if(res.success){
                const newLsData = lsObjsManagerment.filter(item => item.id !== itemId)
                dispatch({type: 'SET_LIST_OBJECTS_MANAGERMENT', payload: newLsData})
                modalRef.current.closeModal()
            }
            AdminService.showMessage(res.success, 'user', 'Deleted', false, null)
            CommonService.turnOffLoader()
        })
        .catch(res => {
            AdminService.showMessage(res.success, 'user', 'Edited', false, null)
            CommonService.turnOffLoader()
        })
    }
    const handleRefresh = () => {
        applyGetLsObjs(curType)
    }
    const handlePaginate = (pageIndex) => {
        applyGetLsObjs(curType, pageIndex)
    }

    // apply
    const applyModalProperties = (title, isEditing, isDeleting) => {
        setModalTitle(title)
        setIsEditing(isEditing)
        setIsDeleting(isDeleting)
    }

    const applyGetLsObjs = (curType, pageIndex = null) => {
        AdminService.applyGetLsObjsManagerment(curType, pageIndex)
        .then(res => {
            dispatch({type: 'SET_LIST_OBJECTS_MANAGERMENT', payload: res.lsObjs})
            dispatch({type: 'SET_PAGINATION', payload: res.pagination})
            CommonService.turnOffLoader()
        })
        .catch(() => AdminService.showMessage(false, curType, 'Get', false, null))
    }

    const checkIsSubmitDisabled = (inputVals, type) => {
        let isValid = ''
        switch (type) {
            case 'user':
                isValid = !(inputVals.firstname && inputVals.lastname && inputVals.address && inputVals.phone && inputVals.email && inputVals.password)
                break;
            default:
                break;
        }
        setIsSubmitDisabled(isValid)
    }

    useEffect(() => {
        checkIsSubmitDisabled(userInputs, curType)
        return () => {}
    }, [userInputs])

    return {userInputs, errors, modalTitle, isEditing, isDeleting, isSubmitDisabled, handleChange, handleBlur, handlePaginate,
        handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete, handleRefresh}
}

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useConnectionService, useAdminService, useCommonService} from '../HookManager'
import CommonConstants from '../../config/CommonConstants'
import { useHistory } from 'react-router-dom'
import Cookie from 'js-cookie'

const apiUrl = CommonConstants.API_URL;

export default function useAdminActions(initial = null, formFields = null, modalRef = null, curType = null) {
    const ConnectionService = useConnectionService()
    const CommonService = useCommonService()
    const AdminService = useAdminService()
    const dispatch = useDispatch()
    const history = useHistory()
    const [userInputs, setUserInputs] = useState(initial)
    const [errors, setErrors] = useState({})
    const [modalTitle, setModalTitle] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const [itemId, setItemId] = useState()

    const {userRole, lsObjsManagerment, lsCategories} = useSelector(state => ({
        userRole: state.auth.user.role,
        lsObjsManagerment: state.admin.lsObjsManagerment,
        lsCategories: state.admin.lsCategories
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
        Object.keys(userInputs).map(key => userInputs[key] = '')
        applySetDefaultUserInputs(curType)
        applyModalProperties(`Create ${curType}`, false, false)
        checkIsSubmitDisabled(userInputs, curType)
        modalRef.current.openModal()
    }
    const handleOpenEdit = (inputInfo) => {
        setItemId(inputInfo.id)
        let editData = {...userInputs}
        formFields.forEach((key, i) => {
            if(key === 'input_image' && inputInfo.image){
                editData['origin_image'] = inputInfo.image.src
                editData[key] = inputInfo.image.src
            }else{
                editData[key] = inputInfo[key]
            }

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
    const handleOpenAnotherView = (type, inputId) => {
        let path = ''
        switch (type) {
            case 'order-details':
                path = 'order-details-managerment/' + inputId
                break;
            default:
                break;
        }
        history.push(path)
    }
    // handle submit
    const handleSubmitCreate = async (evt) => {
        evt.preventDefault()
        const apiQuery = `${apiUrl}/admin-${curType}/createData`
        let sendData = {}
        formFields.forEach(key => {
            sendData[key] = userInputs[key]
        })
        CommonService.turnOnLoader()
        await ConnectionService.axiosPostByUrlWithToken(apiQuery, sendData)
        .then(res => {
            if(!res.success && res.message.email) setErrors({...errors, email: res.message.email[0]})
            else setErrors({...errors, email: ''})
            AdminService.showMessage(res.success, 'user', 'Created', false, null)
            if(res.success){
                modalRef.current.closeModal()
            }
        })
        .catch(res => {
            AdminService.showMessage(res.success, 'user', 'Created', false, null)
        })
        CommonService.turnOffLoader()
    }
    const handleSubmitEdit = async (evt) => {
        evt.preventDefault()
        const apiQuery = `${apiUrl}/admin-${curType}/editData/${itemId}`
        let sendData = {}
        formFields.forEach(key => {
            if(key === 'input_image' && !userInputs[key].includes('base64') && !userInputs[key].includes('http')){
                sendData[key] = ''
            }else{
                sendData[key] = userInputs[key]
            }
        })
        CommonService.turnOnLoader()
        await ConnectionService.axiosPutByUrlWithToken(apiQuery, sendData)
        .then(res => {
            setErrors({...errors, email: (!res.success && res.message.email) ? res.message.email[0] : ''})
            AdminService.showMessage(res.success, 'user', 'Edited', false, null)
            if(res.success){
                let newLsData = lsObjsManagerment.map(item => {
                    if(res.data && item.id === res.data.id){
                        formFields.forEach(key => {
                            if(key === 'input_image' && res.data.image){
                                if(item.image) item.image.src = res.data.image.src
                                else item.image = res.data.image
                            }else if(key === 'category_id'){
                                item['category_name'] = lsCategories.filter(cate => cate.id === res.data.category_id)[0].name
                            }else if(key === 'gender'){
                                item['gender'] = res.data[key]
                                item['genderName'] = res.data[key] === 'M' ? 'Male' : 'Female'
                            }else if(key === 'role_id'){
                                item[key] = res.data[key]
                                item['rolename'] = res.data['rolename']
                            }
                            else{
                                item[key] = res.data[key]
                            }
                        })
                    }
                    if(curType === 'order'){
                        item.status = userInputs.status
                    }
                    return item
                })
                dispatch({type: 'SET_LIST_OBJECTS_MANAGERMENT', payload: newLsData})
                modalRef.current.closeModal()
            }
        })
        .catch(res => {
            AdminService.showMessage(res.success, 'user', 'Edited', false, null)
        })
        CommonService.turnOffLoader()
    }
    const handleSubmitDelete = async (evt) => {
        evt.preventDefault()
        const apiQuery = `${apiUrl}/admin-${curType}/deleteData/${itemId}`
        CommonService.turnOnLoader()
        await ConnectionService.axiosDeleteByUrlWithToken(apiQuery)
        .then(res => {
            if(res.success){
                let newLsData = lsObjsManagerment.filter(item => item.id !== itemId)
                dispatch({type: 'SET_LIST_OBJECTS_MANAGERMENT', payload: newLsData})
                modalRef.current.closeModal()
            }
            AdminService.showMessage(res.success, 'user', 'Deleted', false, null)
        })
        .catch(res => {
            AdminService.showMessage(res.success, 'user', 'Edited', false, null)
        })
        CommonService.turnOffLoader()
    }
    const handleRefresh = () => {
        applyGetLsObjs(curType)
    }
    const handlePaginate = (pageIndex) => {
        applyGetLsObjs(curType, pageIndex)
    }
    const handleSelectedFile = (evt) => {
        const files = evt.target.files
        if(CommonService.hasValueNotNull(files[0])){
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = (evt) => {
                setUserInputs({...userInputs, input_image: `${evt.target.result}`})
            }
        }else{
            setUserInputs({...userInputs, input_image: userInputs.origin_image})
        }
    }

    // apply
    const applyModalProperties = (title, isEditing, isDeleting) => {
        setModalTitle(title)
        setIsEditing(isEditing)
        setIsDeleting(isDeleting)
    }

    const applySetDefaultUserInputs = (type) => {
        switch (type) {
            case 'user':
                setUserInputs({...userInputs, gender: CommonConstants.DEFAULT_GENDER, role_id: CommonConstants.DEFAULT_ROLE})
                break;
            case 'product':
                setUserInputs({...userInputs, category_id: CommonConstants.DEFAULT_CATEID})
                break;
            default:
                break;
        }
    }

    const applyGetLsObjs = async (curType, pageIndex = null) => {
        CommonService.turnOnLoader()
        await AdminService.applyGetLsObjsManagerment(curType, pageIndex)
        CommonService.turnOffLoader()
    }

    const applyLogoutUser = async () => {
        const apiQuery = `${apiUrl}/user/logout`
        CommonService.turnOnLoader()
        await ConnectionService.axiosPostByUrlWithToken(apiQuery)
        .then(res => {
            if(res.success){
                Cookie.remove('access_token')
                dispatch({type: 'LOGOUT_USER'})
                dispatch({type: 'SET_USER_PROFILE', payload: {}})
            }
        })
        .catch(() => AdminService.showMessage(false, 'User', 'Logout', false, null))
        CommonService.turnOffLoader()
    }

    const checkIsSubmitDisabled = (inputVals, type) => {
        let isInvalid = ''
        switch (type) {
            case 'user':
                const firstCondition = !(inputVals.firstname && inputVals.lastname && inputVals.address && inputVals.phone && inputVals.email)
                const secondCondition = !isEditing && !inputVals.password
                isInvalid = firstCondition || secondCondition
                break;
            case 'customer':
                isInvalid = !(inputVals.firstname && inputVals.lastname && inputVals.address && inputVals.phone)
                break;
            case 'product':
                isInvalid = !(inputVals.name && inputVals.price && inputVals.origin)
                break;
            case 'category':
                isInvalid = !(inputVals.cateId && inputVals.name)
                break;
            default:
                break;
        }
        setIsSubmitDisabled(isInvalid)
    }

    useEffect(() => {
        checkIsSubmitDisabled(userInputs, curType)
        return () => {}
    }, [userInputs])

    return {userInputs, errors, modalTitle, isEditing, isDeleting, isSubmitDisabled, handleChange, handleBlur, handlePaginate,
        handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete, handleRefresh,
        handleSelectedFile, applyLogoutUser, handleOpenAnotherView}
}

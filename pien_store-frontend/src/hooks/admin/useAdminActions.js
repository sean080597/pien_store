import { useEffect, useState } from 'react'
import CommonService from '../../services/CommonService.service'
import CommonConstants from '../../config/CommonConstants'
import ConnectionService from '../../services/ConnectionService.service';
import iziToast from 'izitoast';
// import { useDispatch } from 'react-redux'

const apiUrl = CommonConstants.API_URL;

export default function useAdminActions(initial, formFields, modalRef, curType) {
    // const dispatch = useDispatch()
    const [userInputs, setUserInputs] = useState(initial)
    const [modalTitle, setModalTitle] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const [itemId, setItemId] = useState()
    //handle input
    const handleChange = (evt) => {
        const {name, value} = evt.target
        setUserInputs({...userInputs, [name]: value})
    }
    // handle open modal
    const handleOpenCreate = () => {
        Object.keys(userInputs).map((key, index) => userInputs[key] = '')
        setUserInputs({...userInputs, isDeleting: false, isEditing: false, gender: 'M', role_id: 'adm'})
        applyModalProperties(`Create ${curType}`, false, false)
        modalRef.current.openModal()
    }
    const handleOpenEdit = (inputInfo) => {
        setItemId(inputInfo.id)
        let editData = {...userInputs}
        formFields.forEach((key, i) => {
            editData[key] = inputInfo[key]
        })
        setUserInputs(editData)
        applyModalProperties(`Edit ${curType}`, true, false)
        modalRef.current.openModal()
    }
    const handleOpenDelete = (inputUserId) => {
        setUserInputs({...userInputs, userId: inputUserId})
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
            if(res.message.email) setUserInputs({...userInputs, emailError: res.message.email[0]})
            else setUserInputs({...userInputs, emailError: ''})
            showMessage(res.success, 'user', 'Created', false, null)
            modalRef.current.closeModal()
            CommonService.turnOffLoader()
        })
        .catch(res => {
            showMessage(res.success, 'user', 'Created', false, null)
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
        ConnectionService.axiosPostByUrlWithToken(apiQuery, sendData)
        .then(res => {
            showMessage(res.success, 'user', 'Edited', false, null)
            modalRef.current.closeModal()
            CommonService.turnOffLoader()
        })
        .catch(res => {
            showMessage(res.success, 'user', 'Edited', false, null)
            CommonService.turnOffLoader()
        })
    }
    const handleSubmitDelete = async (evt) => {
        evt.preventDefault()
        console.log('delete user input ==> ', userInputs)
    }

    // apply
    const applyModalProperties = (title, isEditing, isDeleting) => {
        setModalTitle(title)
        setIsEditing(isEditing)
        setIsDeleting(isDeleting)
    }
    const showMessage = (isSuccess, type, action, isShowMsg, msg = null) => {
        if(isSuccess){
            iziToast.success({
                title: 'Success',
                message: `${action} ${type} successfully`,
                position: 'topCenter'
            })
        }
        if(!isSuccess){
            if(isShowMsg){
                iziToast.error({
                    title: 'Failed',
                    message: msg,
                    position: 'topCenter'
                })
            }else{
                iziToast.error({
                    title: 'Failed',
                    message: 'There was an error!',
                    position: 'topCenter'
                })
            }
        }
    }
    const checkIsSubmitDisabled = (inputVals) => {
        let isValid = !(inputVals.firstname && inputVals.lastname && inputVals.address && inputVals.phone && inputVals.email && inputVals.password)
        setIsSubmitDisabled(isValid)
    }

    useEffect(() => {
        checkIsSubmitDisabled(userInputs)
        return () => {
            
        }
    }, [userInputs])
    return {userInputs, modalTitle, isEditing, isDeleting, isSubmitDisabled,
        handleChange, handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete}
}

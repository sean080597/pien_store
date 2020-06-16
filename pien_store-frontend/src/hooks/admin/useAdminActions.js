import { useEffect, useState } from 'react'
import CommonService from '../../services/CommonService.service'
import CommonConstants from '../../config/CommonConstants'
import ConnectionService from '../../services/ConnectionService.service';
// import { useDispatch } from 'react-redux'

const apiUrl = CommonConstants.API_URL;

export default function useAdminActions(initial, formFields, modalRef, curType) {
    // const dispatch = useDispatch()
    const [userInputs, setUserInputs] = useState(initial)
    //handle input
    const handleChange = (evt) => {
        const {name, value, validity} = evt.target;
        if((name === 'phone' && validity.valid) || name !== 'phone'){
            setUserInputs({...userInputs, [name]: value})
        }
    }
    // handle open modal
    const handleOpenCreate = () => {
        modalRef.current.openModal()
        setUserInputs({...userInputs, modalTitle: `Create ${curType}`})
    }
    const handleOpenEdit = (inputInfo) => {
        modalRef.current.openModal()
        let editData = {...userInputs, modalTitle: `Edit ${curType}`}
        formFields.forEach((element, i) => {
            editData[element] = inputInfo[element]
        })
        setUserInputs(editData)
    }
    const handleOpenDelete = (inputUserId) => {
        modalRef.current.openModal()
        setUserInputs({...userInputs, modalTitle: `Delete ${curType}`, userId: inputUserId})
    }
    // handle submit
    const handleSubmitCreate = async (evt) => {
        evt.preventDefault()
        console.log('create user input ==> ', userInputs)
    }
    const handleSubmitEdit = async (evt) => {
        evt.preventDefault()
        console.log('edit user input ==> ', userInputs)
    }
    const handleSubmitDelete = async (evt) => {
        evt.preventDefault()
        console.log('delete user input ==> ', userInputs)
    }

    useEffect(() => {
        return () => {
            
        }
    }, [])
    return {userInputs, handleChange, handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete}
}

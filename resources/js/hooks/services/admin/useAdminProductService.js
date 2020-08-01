import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAdminService, useCommonService } from '../../HookManager'
import { useHistory } from 'react-router-dom'
import CommonConstants from '../../../config/CommonConstants'
import uiModel from '../../../models/uiModel'
import _ from 'lodash'

export default function useAdminProductService(modalRef = null, curType, curAction = null) {
  // services
  const CommonService = useCommonService()
  const AdminService = useAdminService()
  const dispatch = useDispatch()
  const history = useHistory()
  // variables
  const managementPath = '/admin-su/product-managerment'
  const formFields = ['name', 'price', 'description', 'origin', 'category_id', 'input_image']
  const moduleData = uiModel[curType]
  const [userInputs, setUserInputs] = useState(moduleData)
  const [errors, setErrors] = useState({})
  const [noErrors, setNoErrors] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
  const [itemId, setItemId] = useState('')
  const [mainImage, setMainImage] = useState(moduleData.input_image.arrayDefault)
  const [otherImages, setOtherImages] = useState([])
  // store
  const { dataModel, lsObjsManagerment, lsCategories } = useSelector(state => ({
    dataModel: state.admin.dataModel,
    lsObjsManagerment: state.admin.lsObjsManagerment,
    lsCategories: state.admin.lsCategories
  }))

  // handle
  const handleChange = (evt) => {
    CommonService.validateInput(evt, userInputs, setUserInputs)
  }
  const handleBlur = () => {
    const sendData = applyGetValidateData(userInputs, false)
    const validationErrors = CommonService.validateErrors(sendData)
    setErrors(validationErrors)
  }
  const handlePaginate = (pageIndex) => {
    applyGetLsObjs(curType, pageIndex)
  }
  const handleOpenCreate = () => {
    applySetDetaultUserInputs()
    applyModalProperties(`Create ${curType}`, false, false)
    modalRef.current.openModal()
  }
  const handleOpenEdit = (inputInfo) => {
    setItemId(inputInfo.id)
    applySetUserInputs(inputInfo)
    applyModalProperties(`Edit ${curType}`, true, false)
    modalRef.current.openModal()
  }
  const handleOpenDelete = (inputUserId) => {
    setItemId(inputUserId)
    applyModalProperties(`Delete ${curType}`, false, true)
    modalRef.current.openModal()
  }
  const handleOpenProductDetails = (action, inputId = null) => {
    let path = 'product-details-managerment/'
    if (action === 'create') {
      path += action
    }
    else if (action === 'edit') {
      const filteredItem = lsObjsManagerment.filter(item => item.id === inputId)
      dispatch({type: 'SET_DATA_MODEL', payload: filteredItem[0]})
      path += action + '/' + inputId
    }
    history.push(path)
  }
  const handleSearch = (searchData) => {
    applyGetLsObjs(curType, null, null, searchData)
  }
  const handleSubmitCreate = async (evt) => {
    evt.preventDefault()
    if(noErrors){
      const sendData = applyGetValidateData(userInputs, true)
      CommonService.turnOnLoader()
      await AdminService.applyCreateData(curType, sendData)
      .then(res => {
        if (res.success) {
          modalRef && modalRef.current.closeModal()
          history.push(managementPath)
        }
      })
      CommonService.turnOffLoader()
    }
  }
  const handleSubmitEdit = async (evt) => {
    evt.preventDefault()
    if(noErrors){
      const sendData = applyGetValidateData(userInputs, true)
      CommonService.turnOnLoader()
      await AdminService.applyEditData(curType, sendData, itemId)
      .then(res => {
        if (res.success) {
          let newLsData = lsObjsManagerment.map(item => {
            if (res.data && item.id === res.data.id) {
              formFields.forEach(key => {
                if (key === 'input_image' && res.data.image) {
                  if (item.image) item.image.src = res.data.image.src
                  else item.image = res.data.image
                }else {
                  item[key] = res.data[key]
                }
              })
            }
            return item
          })
          dispatch({ type: 'SET_LIST_OBJECTS_MANAGERMENT', payload: newLsData })
          modalRef && modalRef.current.closeModal()
          history.push(managementPath)
        }
      })
      CommonService.turnOffLoader()
    }
  }
  const handleSubmitDelete = async (evt) => {
    evt.preventDefault()
    CommonService.turnOnLoader()
    await AdminService.applyDeleteData(curType, itemId)
    .then(res => {
      if (res.success) {
        let newLsData = lsObjsManagerment.filter(item => item.id !== itemId)
        dispatch({ type: 'SET_LIST_OBJECTS_MANAGERMENT', payload: newLsData })
        modalRef && modalRef.current.closeModal()
      }
    })
    CommonService.turnOffLoader()
  }
  const handleRefresh = () => {
    applyGetLsObjs(curType)
  }
  const handleSelectedFileMainImg = (evt) => {
    const files = evt.target.files
    let tmpData = _.cloneDeep(userInputs['input_image'])
    if(CommonService.hasValueNotNull(files[0])){
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (evt) => {
        tmpData.value[0].src = `${evt.target.result}`
        setUserInputs({...userInputs, input_image: tmpData})
      }
    }else{
      tmpData.value[0].src = userInputs.origin_image.value
      setUserInputs({...userInputs, input_image: tmpData})
    }
  }
  const handleSelectedFileOtherImgs = (evt, isURL = false) => {
    let tmpData = _.cloneDeep(userInputs['input_image'])
    let dataDefault = _.cloneDeep(userInputs['input_image'].arrayDefault)
    dataDefault.order = tmpData.value.length
    if(isURL && CommonService.checkRegexURL(evt)){
      dataDefault.src = evt
      tmpData.value.push(dataDefault)
      setUserInputs({...userInputs, input_image: tmpData})
    }
    if(!isURL && evt.target.type === 'file'){
      const files = evt.target.files
      if(CommonService.hasValueNotNull(files[0])){
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (evt) => {
          dataDefault.src = `${evt.target.result}`
          tmpData.value.push(dataDefault)
          setUserInputs({...userInputs, input_image: tmpData})
        }
      }
    }
  }
  const handleDragEnd = (result) => {
    const {destination, source, reason} = result
    if(!destination || reason === 'CANCEL') return
    if(destination.droppableId === source.droppableId && destination.index === source.index) return
    let tmpData = _.cloneDeep(userInputs['input_image'])
    const droppedImg = tmpData.value[source.index + 1]
    tmpData.value.splice(source.index + 1, 1)
    tmpData.value.splice(destination.index + 1, 0, droppedImg)
    setUserInputs({...userInputs, input_image: tmpData})
  }

  // apply
  const applyGetLsObjs = async (curType, pageIndex = null, pageSize = null, search = null) => {
    CommonService.turnOnLoader()
    await AdminService.applyGetLsObjsManagerment(curType, pageIndex, pageSize, search)
    CommonService.turnOffLoader()
  }
  const applyModalProperties = (title, isEditing, isDeleting) => {
    setModalTitle(title)
    setIsEditing(isEditing)
    setIsDeleting(isDeleting)
  }
  const checkIsSubmitDisabled = (inputVals) => {
    const isInvalid = !(inputVals.name.value && inputVals.price.value && inputVals.origin.value)
    setIsSubmitDisabled(isInvalid)
  }
  const applySetUserInputs = (inputInfo) => {
    let editData = { ...userInputs }
    formFields.forEach((key, i) => {
      if (key === 'input_image') {
        editData[key].value.length = 0
        if (inputInfo.images.length > 0) {
          // main image
          const mainImg = inputInfo.images.filter(t => t.order === 0)[0]
          editData['origin_image'].value = mainImg? mainImg.src : ''
          editData[key].value.push(mainImg ? mainImg : editData[key].arrayDefault)
          // other images
          const otherImgs = inputInfo.images.filter(t => t.order !== 0)
          if(otherImgs.length > 0){
            editData[key].value = editData[key].value.concat(otherImgs)
          }
        }else{
          editData[key].value.push(_.cloneDeep(editData[key].arrayDefault))
        }
      } else if(CommonService.hasValueNotNull(inputInfo[key])){
        editData[key].value = inputInfo[key]
      }
    })
    setUserInputs(editData)
  }
  const applySetDetaultUserInputs = () => {
    let editData = { ...userInputs }
    Object.keys(editData).map(key => {
      if(typeof editData[key].value !== 'object') editData[key].value = ''
      if(typeof editData[key].value === 'object'){
        editData[key].value.length = 0
        editData[key].value.push(_.cloneDeep(editData[key].arrayDefault))
      }
    })
    editData['category_id'].value = CommonConstants.DEFAULT_CATEID
    setUserInputs(editData)
  }
  const applyGetValidateData = (inputVals, isGetSendData = false) => {
    const cloneData = _.cloneDeep(inputVals)
    let tmpData = {}
    formFields.forEach(key => {tmpData[key] = isGetSendData ? cloneData[key].value : cloneData[key]})
    if(isGetSendData){
      tmpData['input_image'].map((item, index) => {item.order = index})
    }
    return tmpData
  }
  // useEffect
  useEffect(() => {setNoErrors(Object.keys(errors).length === 0)}, [errors])
  useEffect(() => {
    if(userInputs){
      checkIsSubmitDisabled(userInputs)
      if(userInputs.input_image && userInputs.input_image.value.length > 0){
        const tmpMainImg = userInputs.input_image.value.filter(t => t.order === 0)[0]
        setMainImage(tmpMainImg)
        const tmpOtherImgs = userInputs.input_image.value.filter(t => t.order !== 0)
        setOtherImages(tmpOtherImgs)
      }
    }
  }, [userInputs])
  useEffect(() => {
    if(curAction === 'edit'){
      setItemId(dataModel.id)
      applyModalProperties(`Edit ${curType}`, true, false)
      applySetUserInputs(dataModel)
    }else{
      applyModalProperties(`Create ${curType}`, false, false)
      applySetDetaultUserInputs()
    }
  }, [])

  return { userInputs, errors, modalTitle, isEditing, isDeleting, isSubmitDisabled, handleChange, handleBlur, handlePaginate, handleRefresh, handleSearch,
    handleOpenCreate, handleOpenEdit, handleOpenDelete, handleSubmitCreate, handleSubmitEdit, handleSubmitDelete, handleOpenProductDetails, handleSelectedFileMainImg,
    handleSelectedFileOtherImgs, mainImage, otherImages, handleDragEnd}
}

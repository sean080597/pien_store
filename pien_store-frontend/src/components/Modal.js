import React, { useState, forwardRef, useImperativeHandle } from 'react'
import ReactDom from 'react-dom'

const Modal = forwardRef((props, ref) => {
    const [isShowModal, setIsShowModal] = useState(false)
    const modalWidth = props.modalWidth

    useImperativeHandle(ref, () => {
        return {
            openModal: () => open(),
            closeModal: () => close()
        }
    })

    const open = () => {
        setIsShowModal(true)
    }

    const close = () => {
        setIsShowModal(false)
    }

    if(isShowModal){
        return ReactDom.createPortal(
            <div className={'modal-wrapper'}>
                <div className={'modal-backdrop'}></div>
                <div className={'modal-box'} style={{width: modalWidth}}>
                    {props.children}
                </div>
            </div>, document.getElementById('modal-root'))
    }

    return null
})
export default Modal
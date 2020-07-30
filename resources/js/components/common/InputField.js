import React, {useState} from 'react'

export default function InputField({className, id, name, type, stateValue, setStateValue, onChange, onBlur, maxLength, placeholder,
  pattern, prependIcon, appendIcon, prependText, appendText, prependClick, appendClick, disabled, appendDisabled, prependDisabled,
  appendBtnText}) {
  const handleChange = (evt) => {
    const {name, value, validity, type, maxLength} = evt.target
    const isValidInputVal = (type === 'number' && validity.valid) || type !== 'number'
    const isValidInputLength = (maxLength > 0 && value.length <= maxLength) || maxLength === -1 || maxLength === undefined
    if(isValidInputVal && isValidInputLength){
      setStateValue({...stateValue, [name]: value})
    }
    onChange && onChange(evt)
  }
  const handleBlur = (evt) => {
    onBlur && onBlur(evt)
  }
  return (
    <div className="input-group">
      {
        (prependIcon || prependText) &&
        <span className={'input-group-addon' + (prependClick ? ' hasEvent' : '') + (prependDisabled ? ' disabled' : '')} onClick={(prependDisabled && prependClick) ? prependClick : null}>
          {prependIcon && <i className={'fa fa-' + prependIcon}></i>}
          {prependText ? prependText : ''}
        </span>
      }
      <input className={'form-control' + (className ? ' '+className : '')} id={id} name={name} type={type} onBlur={handleBlur} onChange={handleChange}
        value={(stateValue ? stateValue[name] : '') || ''} maxLength={maxLength} placeholder={placeholder} pattern={pattern} disabled={disabled}/>
      {
        (appendIcon || appendText) &&
        <span className={'input-group-addon' + (appendClick ? ' hasEvent' : '') + (appendDisabled ? ' disabled' : '')} onClick={(!appendDisabled && appendClick) ? appendClick : null}>
          {appendIcon && <i className={'fa fa-' + appendIcon}></i>}
          {appendText ? appendText : ''}
        </span>
      }
    </div>
  )
}

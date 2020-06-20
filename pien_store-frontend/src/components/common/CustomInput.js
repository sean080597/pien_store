import React from 'react'
import {useCustomInput} from '../../hooks/HookManager'

export default function CustomInput({id, value, name, validity, type, minLength, maxLength, key, className, disabled, placeholder, onChange, inputError}) {
  const {userInput, error, handleChange, handleBlur} = useCustomInput(value, type, onChange)
  return (
    <div className="custom-input">
      <input id={id} className={className} name={name} validity={validity} type={type} value={userInput}
      minLength={minLength} maxLength={maxLength} key={key} disabled={disabled} placeholder={placeholder}
      onChange={handleChange} onBlur={handleBlur}/>
      {error && <span className="text-danger">{error}</span>}
      {inputError && <span className="text-danger">{inputError}</span>}
    </div>
  )
}

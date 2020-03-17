import React from 'react'

function useFormValidation(inititalState) {
    const [inputs, setInputs] = React.useState(inititalState);

    function handleChange(event){
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }

    return {handleChange, inputs}
}

export default useFormValidation;
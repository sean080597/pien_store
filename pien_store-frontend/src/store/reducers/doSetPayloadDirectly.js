const doSetPayloadDirectly = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_PAYLOAD_DIRECTLY':
            return {...state, payload}
        default:
            return state
    }
}
export default doSetPayloadDirectly
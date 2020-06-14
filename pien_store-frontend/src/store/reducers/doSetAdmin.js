const doSetAdmin = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_LIST_OBJECTS_MANAGERMENT':
            return {...state, lsObjsManagerment: payload}
        default:
            return state
    }
}
export default doSetAdmin
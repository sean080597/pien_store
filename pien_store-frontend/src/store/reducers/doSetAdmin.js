const doSetAdmin = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_LIST_OBJECTS_MANAGERMENT':
            return {...state, lsObjsManagerment: payload}
        case 'SET_LIST_ROLES':
            return {...state, lsRoles: payload}
        default:
            return state
    }
}
export default doSetAdmin
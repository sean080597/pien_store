const doSetCommon = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_TRUE_IS_FIRST_LOADED':
            return {...state, isFirstLoadPage: true}
        case 'SET_FALSE_IS_FIRST_LOADED':
            return {...state, isFirstLoadPage: false}
        case 'SET_TRUE_IS_NOT_FOUND_PAGE':
            return {...state, isNotFoundPage: true}
        case 'SET_FALSE_IS_NOT_FOUND_PAGE':
            return {...state, isNotFoundPage: false}
        case 'SET_CURRENT_PATH':
            return {...state, currentPath: payload}
        default:
            return state
    }
}
export default doSetCommon
const doCheckNotFoundPage = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_TRUE_IS_NOT_FOUND_PAGE':
            return true
        case 'SET_FALSE_IS_NOT_FOUND_PAGE':
            return false
        default:
            return state
    }
}
export default doCheckNotFoundPage
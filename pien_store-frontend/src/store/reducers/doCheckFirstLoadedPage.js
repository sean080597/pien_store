const doCheckFirstLoadedPage = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_TRUE_IS_FIRST_LOADED':
            return true
        case 'SET_FALSE_IS_FIRST_LOADED':
            return false
        default:
            return state
    }
}
export default doCheckFirstLoadedPage
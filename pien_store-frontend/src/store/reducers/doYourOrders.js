const doYourOrders = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_RECENT_ORDERS':
            return {...state, lsRecentOrders: payload}
        default:
            return state
    }
}
export default doYourOrders
const doShopCart = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_ORDER_ADDRESSES':
            return {...state, orderAddresses: payload}
        default:
            return state
    }
}
export default doShopCart
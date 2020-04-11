const doShopCart = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_SELECTED_ADDRESS':
            return {...state, selectedAddress: payload}
        case 'SET_ORDER_ADDRESSES':
            return {...state, orderAddresses: payload}
        case 'SET_CLONE_ORDER_ADDRESSES':
            return {...state, cloneOrderAddresses: payload}
        default:
            return state
    }
}
export default doShopCart
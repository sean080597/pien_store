const doShopCart = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_CATEGORIES':
            return {...state, categories: payload}
        case 'SET_PRODUCTS':
            return {...state, products: payload}
        case 'SET_CART_ITEMS':
            return {...state, cartItems: payload}
        case 'SET_CART_COUNT':
            return {...state, cartCount: payload}
        case 'SET_CART_TOTAL':
            return {...state, cartTotal: payload}
        case 'SET_RELATED_PRODUCTS':
            return {...state, relatedProducts: payload}
        default:
            return state
    }
}
export default doShopCart
const doShopCart = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_CATEGORIES':
            return {...state, categories: payload}
        case 'SET_PRODUCTS':
            return {...state, products: payload.products, pagePagination: payload.pagination}
        case 'SET_FILTERED_PRODUCTS':
            return {...state, filteredProducts: payload}
        case 'SET_CART_ITEMS':
            return {...state, cartItems: payload}
        default:
            return state
    }
}
export default doShopCart
const doShopCart = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_PRODUCTS':
            return {...state, products: payload.products}
        case 'SET_FILTERED_PRODUCTS':
            return {...state, filteredProducts: payload.filteredProducts}
        default:
            return state
    }
}
export default doShopCart
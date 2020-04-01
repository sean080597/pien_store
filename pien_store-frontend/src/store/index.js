import { createStore } from 'redux'
import CombinedAllReducers from './reducers/CombinedAllReducers'

const initialStates = {
    isFirstLoadPage: true,
    isNotFoundPage: false,
    currentPath: '',
    auth: {
        loggedIn: false,
        token: '',
        user: {}
    },
    shop:{
        categories: [],
        products: [],
        filteredProducts: [],
        pagePagination: {},
        cartItems: [],
        cartCount: 0,
        cartTotal: 0
    }
}

const store = createStore(CombinedAllReducers, initialStates, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
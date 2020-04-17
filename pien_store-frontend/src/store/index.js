import { createStore } from 'redux'
import CombinedAllReducers from './reducers/CombinedAllReducers'

const initialStates = {
    common: {
        isFirstLoadPage: true,
        isNotFoundPage: false,
        currentPath: '',
        apiHeaders: {
            'Content-Type': 'application/json',
            'Authorization': ''
        }
    },
    auth: {
        loggedIn: false,
        token: '',
        user: {},
        profile: {}
    },
    shop:{
        categories: [],
        products: [],
        pagePagination: {},
        cartItems: [],
        cartCount: 0,
        cartTotal: 0,
        relatedProducts: []
    },
    checkout: {
        selectedAddress: {},
        orderAddresses: [],
        cloneOrderAddresses: []
    }
}

const store = createStore(CombinedAllReducers, initialStates, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
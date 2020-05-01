import { createStore } from 'redux'
import CombinedAllReducers from './reducers/CombinedAllReducers'

const initialStates = {
    common: {
        isFirstLoadPage: true,
        isNotFoundPage: false,
        currentPath: '',
        pagePagination: {}
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
        cartItems: [],
        cartCount: 0,
        cartTotal: 0,
        relatedProducts: []
    },
    checkout: {
        selectedAddress: {},
        orderAddresses: [],
        cloneOrderAddresses: []
    },
    yourOrders: {
        lsRecentOrders: []
    }
}

const store = createStore(CombinedAllReducers, initialStates, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
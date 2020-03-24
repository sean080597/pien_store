import { createStore } from 'redux'
import CombinedAllReducers from './reducers/CombinedAllReducers'

const initialStates = {
    isFirstLoadPage: true,
    isNotFoundPage: false,
    auth: {
        loggedIn: false,
        token: '',
        user: {}
    },
    shop:{
        products: [],
        filteredProducts: []
    }
}

const store = createStore(CombinedAllReducers, initialStates, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
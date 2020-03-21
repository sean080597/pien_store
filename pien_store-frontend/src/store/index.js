import { createStore } from 'redux'
import CombinedAllReducers from './reducers/CombinedAllReducers'

const initialStates = {
    auth: {
        loggedIn: false,
        token: '',
        user: {}
    },
    isNotFoundPage: false,
    shop:{
        products: [],
        filteredProduct: []
    }
}

const store = createStore(CombinedAllReducers, initialStates, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
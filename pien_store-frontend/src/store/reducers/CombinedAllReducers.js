import { combineReducers } from 'redux';
import GoogleAuthReducer from './GoogleAuthReducer'
import doCheckNotFoundPage from './doCheckNotFoundPage'
import doShopCart from './doShopCart'

export default combineReducers({
    isNotFoundPage: doCheckNotFoundPage,
    auth: GoogleAuthReducer,
    shop: doShopCart
});
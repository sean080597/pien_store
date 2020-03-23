import { combineReducers } from 'redux';
import doGoogleAuth from './doGoogleAuth'
import doCheckNotFoundPage from './doCheckNotFoundPage'
import doCheckFirstLoadedPage from './doCheckFirstLoadedPage'
import doShopCart from './doShopCart'

export default combineReducers({
    isFirstLoadPage: doCheckFirstLoadedPage,
    isNotFoundPage: doCheckNotFoundPage,
    auth: doGoogleAuth,
    shop: doShopCart
});
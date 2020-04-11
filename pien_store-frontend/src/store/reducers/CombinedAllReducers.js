import { combineReducers } from 'redux';
import doCheckFirstLoadedPage from './doCheckFirstLoadedPage'
import doCheckNotFoundPage from './doCheckNotFoundPage'
import doSetPayloadDirectly from './doSetPayloadDirectly'
import doGoogleAuth from './doGoogleAuth'
import doShopCart from './doShopCart'
import doCheckout from './doCheckout'

export default combineReducers({
    isFirstLoadPage: doCheckFirstLoadedPage,
    isNotFoundPage: doCheckNotFoundPage,
    currentPath: doSetPayloadDirectly,
    auth: doGoogleAuth,
    shop: doShopCart,
    checkout: doCheckout
});
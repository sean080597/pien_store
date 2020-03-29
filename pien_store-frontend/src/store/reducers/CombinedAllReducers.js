import { combineReducers } from 'redux';
import doCheckFirstLoadedPage from './doCheckFirstLoadedPage'
import doCheckNotFoundPage from './doCheckNotFoundPage'
import doSetPayloadDirectly from './doSetPayloadDirectly'
import doGoogleAuth from './doGoogleAuth'
import doShopCart from './doShopCart'

export default combineReducers({
    isFirstLoadPage: doCheckFirstLoadedPage,
    isNotFoundPage: doCheckNotFoundPage,
    currentPath: doSetPayloadDirectly,
    auth: doGoogleAuth,
    shop: doShopCart
});
import { combineReducers } from 'redux';
import doSetCommon from './doSetCommon'
import doGoogleAuth from './doGoogleAuth'
import doShopCart from './doShopCart'
import doCheckout from './doCheckout'

export default combineReducers({
    common: doSetCommon,
    auth: doGoogleAuth,
    shop: doShopCart,
    checkout: doCheckout
});
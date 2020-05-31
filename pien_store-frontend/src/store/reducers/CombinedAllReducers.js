import { combineReducers } from 'redux';
import doSetCommon from './doSetCommon'
import doAuthenticateUser from './doAuthenticateUser'
import doShopCart from './doShopCart'
import doCheckout from './doCheckout'
import doYourOrders from './doYourOrders'
import doGalleryPhotos from './doGalleryPhotos'

export default combineReducers({
    common: doSetCommon,
    auth: doAuthenticateUser,
    shop: doShopCart,
    checkout: doCheckout,
    yourOrders: doYourOrders,
    gallery: doGalleryPhotos
});
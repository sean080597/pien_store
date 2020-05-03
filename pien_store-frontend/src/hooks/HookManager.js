import useTurnOnOffLoader from './useTurnOnOffLoader'
import useScreenWidth from './useScreenWidth'
//login hooks
import useFormLogin from './use-form-login/useFormLogin'
import validationAuth from './use-form-login/validationAuth'
//social login
import useGoogleLogin from './use-login/useGoogleLogin'
//Shop Cart
import useShopCart from './shop/useShopCart'
import useProductDetails from './shop/useProductDetails'
//------------------
import useNotFoundPage from './useNotFoundPage'
import useUserProfile from './use-login/useUserProfile'
import useCheckout from './useCheckout'
import useOurGallery from './gallery/useOurGallery'
import useSinglePhoto from './gallery/useSinglePhoto'
import usePagePagination from './usePagePagination'
import useYourOrders from './your-orders/useYourOrders'
import useOrderDetails from './your-orders/useOrderDetails'

export {
    //turn on & off laoder
    useTurnOnOffLoader,
    //return screen width with event resize
    useScreenWidth,
    //form login
    useFormLogin,
    validationAuth,
    //social login
    useGoogleLogin,
    //shop cart
    useShopCart,
    useProductDetails,
    //others
    useNotFoundPage,
    useUserProfile,
    useCheckout,
    useOurGallery,
    usePagePagination,
    useSinglePhoto,
    useYourOrders,
    useOrderDetails
}
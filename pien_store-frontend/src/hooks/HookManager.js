import useTurnOnOffLoader from './useTurnOnOffLoader'
import useScreenWidth from './useScreenWidth'
//login hooks
import useFormLogin from './useFormLogin/useFormLogin'
import validationAuth from './useFormLogin/validationAuth'
//social login
import useGoogleLogin from './useLogin/useGoogleLogin'
//Shop Cart
import useShopCart from './useShopCart'
import useProductDetails from './useProductDetails'
//------------------
import useNotFoundPage from './useNotFoundPage'
import useUserProfile from './useLogin/useUserProfile'
import useCheckout from './useCheckout'
import useOurGallery from './gallery/useOurGallery'
import useSinglePhoto from './gallery/useSinglePhoto'
import useYourOrders from './useYourOrders'
import usePagePagination from './usePagePagination'

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
    useSinglePhoto,
    useYourOrders,
    usePagePagination
}
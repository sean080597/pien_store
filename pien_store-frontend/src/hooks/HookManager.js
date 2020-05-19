// client
import useTurnOnOffLoader from './client/useTurnOnOffLoader'
import useGoogleLogin from './client/use-login/useGoogleLogin'
import useShopCart from './client/shop/useShopCart'
import useProductDetails from './client/shop/useProductDetails'
import useUserProfile from './client/use-login/useUserProfile'
import useCheckout from './client/useCheckout'
import useOurGallery from './client/gallery/useOurGallery'
import useSinglePhoto from './client/gallery/useSinglePhoto'
import useYourOrders from './client/your-orders/useYourOrders'
import useOrderDetails from './client/your-orders/useOrderDetails'

// admin
import useInitializePageAdmin from './admin/useInitializePageAdmin'
import useFormLogin from './admin/use-form-login/useFormLogin'
import validationAuth from './admin/use-form-login/validationAuth'
import useAdminHome from './admin/useAdminHome'

// common
import useNotFoundPage from './useNotFoundPage'
import usePagePagination from './usePagePagination'
import useScreenWidth from './useScreenWidth'

export {
    // client
    useTurnOnOffLoader,
    useGoogleLogin,
    useShopCart,
    useProductDetails,
    useUserProfile,
    useCheckout,
    useOurGallery,
    useSinglePhoto,
    useYourOrders,
    useOrderDetails,

    // admin
    useInitializePageAdmin,
    useFormLogin,
    validationAuth,
    useAdminHome,

    // common
    useScreenWidth,
    useNotFoundPage,
    usePagePagination,
}
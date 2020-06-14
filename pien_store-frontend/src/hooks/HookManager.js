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
import useOurStory from './client/useOurStory'

// admin
import useInitializePageAdmin from './admin/useInitializePageAdmin'
import useFormLogin from './admin/use-form-login/useFormLogin'
import validationAuth from './admin/use-form-login/validationAuth'
import useAdminHome from './admin/useAdminHome'
import useAdminUser from './admin/useAdminUser'

// common
import useNotFoundPage from './useNotFoundPage'
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
    useOurStory,

    // admin
    useInitializePageAdmin,
    useFormLogin,
    validationAuth,
    useAdminHome,
    useAdminUser,

    // common
    useScreenWidth,
    useNotFoundPage
}
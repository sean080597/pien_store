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
import validationInputs from './admin/use-form-login/validationInputs'
import useAdminActions from './admin/useAdminActions'

// common
import useNotFoundPage from './common/useNotFoundPage'
import useScreenWidth from './common/useScreenWidth'

// services
import useConnectionService from './services/common/useConnectionService'
import useCommonService from './services/common/useCommonService'
import usePageLoadService from './services/common/usePageLoadService'
import useAdminService from './services/admin/useAdminService'
import useAdminProductService from './services/admin/useAdminProductService'
import useClientService from './services/client/useClientService'

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
    validationInputs,
    useAdminActions,

    // common
    useScreenWidth,
    useNotFoundPage,

    // services
    useConnectionService,
    useCommonService,
    usePageLoadService,
    useAdminService,
    useAdminProductService,
    useClientService
}
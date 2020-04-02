import useTurnOnOffLoader from './useTurnOnOffLoader'
import useScreenWidth from './useScreenWidth'
//login hooks
import useFormLogin from './useFormLogin/useFormLogin'
import validationAuth from './useFormLogin/validationAuth'
//social login
import useGoogleLogin from './useLogin/useGoogleLogin'
//Shop Cart
import useShopCart from './useShopCart/useShopCart'
//------------------
import useNotFoundPage from './useNotFoundPage'
import useConfirmInfo from './useConfirmInfo'

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
    //others
    useNotFoundPage,
    useConfirmInfo
}
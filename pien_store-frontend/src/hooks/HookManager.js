import useTurnOnOffLoader from './useTurnOnOffLoader'
import useScreenWidth from './useScreenWidth'
//login hooks
import useFormLogin from './useFormLogin/useFormLogin'
import validationAuth from './useFormLogin/validationAuth'
//social login
import useGoogleLogin from './useLogin/useGoogleLogin'
//------------------
import useNotFoundPage from './useNotFoundPage'
//Shop Cart
import useShopCart from './useShopCart/useShopCart'

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
    //others
    useNotFoundPage,
    //shop cart
    useShopCart
}
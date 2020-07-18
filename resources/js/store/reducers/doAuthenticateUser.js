const AuthenticateReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'LOGIN_GOOGLE':
            return {...state, loggedIn: true, token: payload.accessToken, user: payload.profileObj}
        case 'LOGOUT_USER':
            return {...state, loggedIn: false, token: '', user: {}}
        case 'LOGIN_ADMIN':
            return {...state, loggedIn: true, token: payload.access_token, user: payload.profileObj}
        case 'SET_AUTH_USER':
            return {...state, user: payload}
        case 'SET_AUTH_USER_PROFILE':
            return {...state, profile: payload}
        default:
            return state
    }
}
export default AuthenticateReducer
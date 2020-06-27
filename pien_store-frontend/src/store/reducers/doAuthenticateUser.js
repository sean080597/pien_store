const AuthenticateReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'LOGIN_GOOGLE':
            return {...state, loggedIn: true, token: payload.accessToken, user: payload.profileObj}
        case 'LOGOUT_USER':
            return {...state, loggedIn: false, token: '', user: {}}
        case 'SET_USER_PROFILE':
            return {...state, profile: payload}
        case 'LOGIN_ADMIN':
            return {...state, loggedIn: true, token: payload.token, user: payload.profileObj}
        default:
            return state
    }
}
export default AuthenticateReducer
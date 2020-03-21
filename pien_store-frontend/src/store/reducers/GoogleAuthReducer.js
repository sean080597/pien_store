const GoogleAuthReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'LOGIN_GOOGLE':
            return {...state, loggedIn: true, token: payload.accessToken, user: payload.profileObj}
        case 'LOGOUT_GOOGLE':
            return {...state, loggedIn: false, token: '', user: {}}
        default:
            return state
    }
}
export default GoogleAuthReducer
const CommonConfig = {
    HOME_BG: "assets/images/home_bg.jpg",
    LOGIN_BG: "assets/images/login_bg.jpg",
    ERROR_BG: "assets/images/login_bg.jpg",
    // messages
    MSG: {
        ERROR:{
            REQUIRED_EMAIL: 'Required Email',
            REQUIRED_PASSWORD: 'Required Password',
            INVALID_EMAIL: 'Required Email',
            INVALID_PASSWORD: 'Required Password',
            AT_LEAST_6_CHARACTERS: 'Password must be at least 6 characters'
        }
    }
}

Object.freeze(CommonConfig);
export default CommonConfig;
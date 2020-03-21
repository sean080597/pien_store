const CommonConfig = {
    HOME_BG: "/assets/images/home_bg.jpg",
    LOGIN_BG: "/assets/images/login_bg.jpg",
    ERROR_BG: "/assets/images/login_bg.jpg",
    // messages
    MSG: {
        ERROR:{
            REQUIRED_EMAIL: 'Required Email',
            REQUIRED_PASSWORD: 'Required Password',
            INVALID_EMAIL: 'Invalid Email',
            INVALID_PASSWORD: 'Invalid Password',
            WRONG_LOGIN_INFO: 'Wrong username or password',
            AT_LEAST_6_CHARACTERS: 'Password must be at least 6 characters'
        }
    },
    //Google Client ID
    GOOGLE_CLIENT_ID: '554896225454-0epg2j824qku9rfmtuf0205jf0rupt38.apps.googleusercontent.com',
}

Object.freeze(CommonConfig);
export default CommonConfig;
import $ from 'jquery'

const CommonService = {
    turnOffLoader() {
        $('.loader').fadeOut();
        $('.page-loader').delay(250).fadeOut('fast');
    },
    turnOnLoader() {
        $('.loader').fadeIn();
        $('.page-loader').fadeIn('fast');
    },
};

export default CommonService;

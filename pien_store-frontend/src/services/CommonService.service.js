import $ from 'jquery'

const CommonService = {
    turnOffLoader() {
        $(window).on('load', function() {
            $('.loader').fadeOut();
            $('.page-loader').delay(350).fadeOut('slow');
        });
    },
    turnOnLoader() {
        $(window).on('load', function() {
            $('.loader').fadeIn();
            $('.page-loader').delay(350).fadeIn('slow');
        });
    },
};

export default CommonService;

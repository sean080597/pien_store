import $ from 'jquery'
import _ from 'lodash'

const protectedRoutes = ['/customer/profile', '/customer/checkout', '/customer/yourOrders']

const CommonService = {
    turnOffLoader() {
        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
    },
    turnOnLoader() {
        $('.loader').fadeIn();
        $('.page-loader').fadeIn('fast');
    },
    goToPosition(el = null){
        if(el) $('html, body').animate({ scrollTop: $(el).position().top }, 'slow');
        else window.scrollTo(0, 0)
    },
    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    },
    checkProtectedRoutes(currentPath){
        return protectedRoutes.some(path => path === currentPath)
    },
    isObjectEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },
    isAnyPropertyOfObjectEmpty(obj, skipProperty = null) {
        let cloneObj = _.cloneDeep(obj)
        if(skipProperty){
            skipProperty.forEach(element => {
                delete cloneObj[element]
            });
        }
        return Object.values(cloneObj).some(element => element === null);
    }
};

export default CommonService;

import $ from 'jquery'

const protectedRoutes = ['/profile', '/checkout']

const CommonService = {
    turnOffLoader() {
        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
    },
    turnOnLoader() {
        $('.loader').fadeIn();
        $('.page-loader').fadeIn('fast');
    },
    goToPosition(el){
        $('html, body').animate({ scrollTop: $(el).position().top }, 'slow');
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
    }
};

export default CommonService;

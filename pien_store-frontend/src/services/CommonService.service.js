import $ from 'jquery'
import _ from 'lodash'
import moment from 'moment'
import CommonConstants from '../config/CommonConstants.json'

const protectedRoutes = ['/customer/profile', '/customer/checkout', '/customer/yourOrders']
const imgDirectorypath = {
    images: [CommonConstants.IMAGES_DIR, CommonConstants.USER_DEFAULT_IMAGE],
    profiles: [CommonConstants.PROFILES_DIR, CommonConstants.USER_DEFAULT_IMAGE],
    categories: [CommonConstants.CATEGORIES_DIR, CommonConstants.CATEGORY_DEFAULT_IMAGE],
    products: [CommonConstants.PRODUCTS_DIR, CommonConstants.PRODUCT_DEFAULT_IMAGE],
    stories: [CommonConstants.STORIES_DIR, CommonConstants.STORY_DEFAULT_IMAGE]
}

const CommonService = {
    turnOffLoader() {
        $('.loader').fadeOut();
        $('.page-loader').fadeOut('slow');
    },
    turnOnLoader() {
        $('.loader').fadeIn();
        $('.page-loader').fadeIn('fast');
    },
    goToPosition(el = null){
        if(el) $('html, body').animate({ scrollTop: $(el).position().top }, 'slow')
        else{
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
            }
            window.scrollTo(0, 0)
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
        return Object.values(cloneObj).some(element => !this.hasValueNotNull(element));
    },
    hasValueNotNull(val){
        return val !== null && val !== undefined && val !== ''
    },
    checkValueToShow(val){
        return this.hasValueNotNull(val) ? val : ''
    },
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0
          && rect.left >= 0
          && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        )
    },
    setEmptyValueObject(obj){
        let keys = Object.keys(obj);
        keys.map(key => {
            if(typeof obj[key] !== 'object' ){
                obj[key] = null
            }else{
                this.setEmptyValueObject(obj[key])
            }
            return key
        })
    },
    removePropertiesObject(obj, arrProperties){
        arrProperties.forEach(item => delete obj[item])
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
    formatNumber(val){
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(val)
    },
    formatDateTime(val){
        return new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            timeZone: "Asia/Ho_Chi_Minh"
        }).format(new Date(val))
    },
    compareDateIsAfter(dateInput, dateToCompare){
        return moment(dateInput).isAfter(moment(dateToCompare))
    },
    generateImageSrc(isServerSide = false, dirName, imgObj, imgSrc = null){
        const publicUrl = isServerSide ? CommonConstants.BE_URL : process.env.PUBLIC_URL
        const resDirPath = imgDirectorypath[dirName][0]
        let resDefImg = imgSrc
        if(imgObj && imgObj.image && imgObj.image.src){
            if(imgObj.image.src.includes('http')) return imgObj.image.src
            resDefImg = imgObj.image.src
        }
        if(!imgSrc) resDefImg = imgDirectorypath[dirName][1]
        return publicUrl + resDirPath + "/" + resDefImg
    }
};

export default CommonService;

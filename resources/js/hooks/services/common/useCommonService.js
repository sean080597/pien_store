import $ from 'jquery'
import _ from 'lodash'
import CommonConstants from '../../../config/CommonConstants'
import {useHistory} from 'react-router-dom'

const protectedRoutes = ['/customer/profile', '/customer/checkout', '/customer/yourOrders']
const imgDirectorypath = {
  images: [CommonConstants.IMAGES_DIR, CommonConstants.USER_DEFAULT_IMAGE],
  profiles: [CommonConstants.PROFILES_DIR, CommonConstants.USER_DEFAULT_IMAGE],
  categories: [CommonConstants.CATEGORIES_DIR, CommonConstants.CATEGORY_DEFAULT_IMAGE],
  products: [CommonConstants.PRODUCTS_DIR, CommonConstants.PRODUCT_DEFAULT_IMAGE],
  stories: [CommonConstants.STORIES_DIR, CommonConstants.STORY_DEFAULT_IMAGE]
}
const regexEmail = new RegExp("^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9]{2,4})$")
const regexURL = new RegExp("https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}")

export default function useCommonService() {
  const history = useHistory()

  function validateInput(inpEvt, inpState, inpDispatch){
    const {name, value, validity, type, maxLength} = inpEvt.target
    const isValidInputVal = (type === 'number' && validity.valid) || type !== 'number'
    const isValidInputLength = (maxLength > 0 && value.length <= maxLength) || maxLength === -1 || maxLength === undefined
    let changedValue = inpState[name]
    if(isValidInputVal && isValidInputLength && typeof inpState[name].value !== 'object'){
      changedValue.value = value
    }else if(Array.isArray(inpState[name].value) && name === 'input_image'){
      changedValue.value[0].src = value
    }
    inpDispatch({...inpState, [name]: changedValue})
  }
  function validateErrors(inpState){
    let errors = {}
    const keys = Object.keys(inpState)
    keys.map(key => {
      if(typeof inpState[key].value !== 'object' && !hasValueNotNull(inpState[key].value) && inpState[key].meta.mandatory === true){
        errors[key] = CommonConstants.ERRORS.MANDATORY
      }
      return key
    })
    return errors
  }
  function turnOffLoader() {
    $('.loader').fadeOut();
    $('.page-loader').fadeOut('slow');
  }
  function turnOnLoader() {
    $('.loader').fadeIn();
    $('.page-loader').fadeIn('fast');
  }
  function goToPosition(el = null) {
    if (el) $('html, body').animate({ scrollTop: $(el).position().top }, 'slow')
    else {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }
      window.scrollTo(0, 0)
    }
  }
  function checkProtectedRoutes(currentPath) {
    return protectedRoutes.some(path => path === currentPath)
  }
  function goToHome(curPath) {
    const redirectPath = curPath.includes('admin') ? '/admin-su/login' : '/'
    history.push(redirectPath)
  }
  function isObjectEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  function isAnyPropertyOfObjectEmpty(obj, skipProperty = null) {
    let cloneObj = _.cloneDeep(obj)
    if (skipProperty) {
      skipProperty.forEach(element => {
        delete cloneObj[element]
      });
    }
    return Object.values(cloneObj).some(element => !this.hasValueNotNull(element));
  }
  function hasValueNotNull(val) {
    return val !== null && val !== undefined && val !== ''
  }
  function checkValueToShow(val) {
    return this.hasValueNotNull(val) ? val : ''
  }
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0
      && rect.left >= 0
      && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }
  function setEmptyValueObject(obj) {
    const keys = Object.keys(obj);
    keys.map(key => {
      if (typeof obj[key] !== 'object') {
        obj[key] = null
      } else {
        this.setEmptyValueObject(obj[key])
      }
      return key
    })
  }
  function removePropertiesObject(obj, arrProperties) {
    arrProperties.forEach(item => delete obj[item])
  }
  function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
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
  }
  function formatNumber(val) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val)
  }
  function formatDateTime(val) {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh"
    }).format(new Date(val))
  }
  function compareDateIsAfter(dateInput, dateToCompare) {
    return moment(dateInput).isAfter(moment(dateToCompare))
  }
  function generateImageSrc(dirName, imgObj = null, imgSrc = null) {
    if (imgSrc && (checkRegexURL(imgSrc) || imgSrc.includes('base64'))) return imgSrc
    const resDirPath = imgDirectorypath[dirName][0]
    let resDefImg = imgSrc ? imgSrc : imgDirectorypath[dirName][1]
    if (imgObj && imgObj.image && imgObj.image.src) {
      if (checkRegexURL(imgObj.image.src) || imgObj.image.src.includes('base64')) return imgObj.image.src
      resDefImg = imgObj.image.src
    }
    if (imgObj && Array.isArray(imgObj.images) && imgObj.images.length > 0) {
      const mainImg = imgObj.images.filter(t => t.order === 0)[0]
      if (checkRegexURL(mainImg.src) || mainImg.src.includes('base64')) return mainImg.src
      resDefImg = mainImg.src
    }
    return resDirPath + "/" + resDefImg
  }
  function checkRegexURL(testStr) {
    return regexURL.test(testStr)
  }
  function checkRegexEmail(testStr) {
    return regexEmail.test(testStr)
  }
  return {
    validateInput, validateErrors, turnOffLoader, turnOnLoader, goToPosition, checkProtectedRoutes, isObjectEmpty, isAnyPropertyOfObjectEmpty, hasValueNotNull,
    checkValueToShow, isElementInViewport, setEmptyValueObject, removePropertiesObject, formatMoney, formatNumber, formatDateTime,
    compareDateIsAfter, generateImageSrc, goToHome, checkRegexURL, checkRegexEmail
  }
}

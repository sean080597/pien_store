import $ from 'jquery';
import {isMobile} from 'react-device-detect';

var screenWidth = Math.max($(window).width(), window.innerWidth);
const PageLoadService = {
    setHandleClickGoToTop(){
        $('a[href="#totop"]').click(function() {
          $('html, body').animate({ scrollTop: 0 }, 'slow');
          return false;
        });
    },
    setNavbarHoverDropdown() {
        if ((screenWidth > 767) && (isMobile !== true)) {
            $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
            var delay = 0;
            var setTimeoutConst;
            $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function() {
                    var $this = $(this);
                    setTimeoutConst = setTimeout(function() {
                        $this.addClass('open');
                        $this.find('.dropdown-toggle').addClass('disabled');
                    }, delay);
                },
                function() {
                    clearTimeout(setTimeoutConst);
                    $(this).removeClass('open');
                    $(this).find('.dropdown-toggle').removeClass('disabled');
                });
        } else {
            $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
            $('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                $(this).parent().siblings().removeClass('open');
                $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                $(this).parent().toggleClass('open');
            });
        }
    },
    setNavbarCollapseClick(){
        $('.navbar-collapse.in').on('click',function(e) {
            if( $(e.target).is('a') && $(e.target).attr('class') !== 'dropdown-toggle' ) {
                $(this).collapse('hide');
            }
        });
    },
};

export default PageLoadService;

import $ from 'jquery';

var screenWidth = Math.max($(window).width(), window.innerWidth),
    isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;

const PageLoadService = {
    setValueVariables(){
        screenWidth = Math.max($(window).width(), window.innerWidth);
    },
    /* ---------------------------------------------- /*
    * Handle go to top
    /* ---------------------------------------------- */
    setHandleClickGoToTop(){
        $('a[href="#totop"]').click(function() {
          $('html, body').animate({ scrollTop: 0 }, 'slow');
          return false;
        });
    },
    /* ---------------------------------------------- /*
    * Handle Navbar
    /* ---------------------------------------------- */
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
    setWidthNavbarSubmenu() {
        if (screenWidth > 767) {
            $('.navbar-custom .navbar-nav > li.dropdown').hover(function() {
                if($('.dropdown-menu', $(this)).length > 0){
                    var MenuLeftOffset  = $('.dropdown-menu', $(this)).offset().left;
                    var Menu1LevelWidth = $('.dropdown-menu', $(this)).width();
                    if (screenWidth - MenuLeftOffset < Menu1LevelWidth * 2) {
                        $(this).children('.dropdown-menu').addClass('leftauto');
                    } else {
                        $(this).children('.dropdown-menu').removeClass('leftauto');
                    }
                    if ($('.dropdown', $(this)).length > 0) {
                        var Menu2LevelWidth = $('.dropdown-menu', $(this)).width();
                        if (screenWidth - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
                            $(this).children('.dropdown-menu').addClass('left-side');
                        } else {
                            $(this).children('.dropdown-menu').removeClass('left-side');
                        }
                    }
                }
            });
        }
    },
    /* ---------------------------------------------- /*
    * Transparent navbar animation
    /* ---------------------------------------------- */
    setNavbarAnimation() {
        var topScroll = $(window).scrollTop();
        if ($('.navbar-custom').length > 0 && $('.home-section').length > 0) {
            if(topScroll >= $('.navbar-custom').height()) {
                $('.navbar-custom').removeClass('navbar-transparent');
            } else {
                $('.navbar-custom').addClass('navbar-transparent');
            }
        }
    },
    /* ---------------------------------------------- /*
    * Any element has home-section class
    /* ---------------------------------------------- */
    buildHomeSection() {
        let homeSection = $('.home-section');
        if (homeSection.length > 0) {
            if (homeSection.hasClass('home-full-height')) {
                homeSection.height($(window).height());
            } else {
                homeSection.height($(window).height() * 0.85);
            }
        }
    }
    /* ---------------------------------------------- /*
    * handle pagination
    /* ---------------------------------------------- */
    
};

export default PageLoadService;

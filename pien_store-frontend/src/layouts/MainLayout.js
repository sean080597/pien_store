import React, { Component } from 'react'
import Router from '../routes';
import $ from 'jquery';
import CommonService from '../services/CommonService.service';
import PageLoadService from '../services/PageLoadService.service';

export default class MainLayout extends Component {
    //methods
    handleScroll = () => {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
    }
    handleResize = () => {
        PageLoadService.setValueVariables();
        PageLoadService.setNavbarHoverDropdown();
    }

    componentDidMount(){
        CommonService.turnOffLoader();
        PageLoadService.setHandleClickGoToTop();
        PageLoadService.setNavbarHoverDropdown();
        PageLoadService.setNavbarCollapseClick();
        PageLoadService.setWidthNavbarSubmenu();
        window.addEventListener('scroll', this.handleScroll, true);
        window.addEventListener('resize', this.handleResize, true);
    }
    UNSAFE_componentWillMount(){
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        return (
            <div>
                <div className="page-loader">
                    <div className="loader">Loading...</div>
                </div>
                <Router/>
                <div className="scroll-up"><a href="#totop"><i className="fa fa-angle-double-up"></i></a></div>
            </div>
        )
    }
}

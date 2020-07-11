import React, { Component } from 'react'
import RouterClient from '../routes/routes-client'
import RouterAdmin from '../routes/routes-admin'
import $ from 'jquery';
import PageLoadService from '../services/PageLoadService.service';
import { LoadingIndicator } from '../components/ComponentsManager'
//plugins
import '../plugins/iziToast'
import '../plugins/reactSlick'

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
    PageLoadService.buildHomeSection();
  }
  handleRenderRoutes = () => {
    return window.location.pathname.includes('admin') ? <RouterAdmin /> : <RouterClient />
  }

  //component methods
  componentDidMount() {
    PageLoadService.setHandleClickGoToTop();
    PageLoadService.setNavbarHoverDropdown();
    PageLoadService.setNavbarCollapseClick();
    PageLoadService.setWidthNavbarSubmenu();
    PageLoadService.buildHomeSection();
    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleResize, true);
  }
  UNSAFE_componentWillMount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <>
        <LoadingIndicator />
        {this.handleRenderRoutes()}
        <div className="scroll-up"><a href="#totop"><i className="fa fa-angle-double-up"></i></a></div>
      </>
    )
  }
}

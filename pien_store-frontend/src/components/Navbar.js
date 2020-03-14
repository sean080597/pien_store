import React, { Component } from "react";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import CommonService from '../services/CommonService.service';
import PageLoadService from '../services/PageLoadService.service';
import { isMobile } from "react-device-detect";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  nav = React.createRef();

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
    alert(isMobile)
    PageLoadService.setNavbarHoverDropdown();
  }

  componentDidMount(){
    CommonService.turnOffLoader();
    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleResize, true);
    PageLoadService.setHandleClickGoToTop();
    PageLoadService.setNavbarHoverDropdown();
    PageLoadService.setNavbarCollapseClick();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <nav className="navbar navbar-custom navbar-fixed-top" role="navigation" ref={this.nav}>
        <div className="container">
          <div className="navbar-header">
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#custom-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Titan</Link>
          </div>
          <div className="collapse navbar-collapse" id="custom-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Headers</a>
                <ul className="dropdown-menu">
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Static Image Header</a>
                    <ul className="dropdown-menu">
                      <li><a href="index_mp_fullscreen_static.html">Fulscreen</a></li>
                      <li><a href="index_mp_classic_static.html">Classic</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Flexslider Header</a>
                    <ul className="dropdown-menu">
                      <li><a href="index_mp_fullscreen_flexslider.html">Fulscreen</a></li>
                      <li><a href="index_mp_classic_flexslider.html">Classic</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Video Background Header</a>
                    <ul className="dropdown-menu">
                      <li><a href="index_mp_fullscreen_video_background.html">Fulscreen</a></li>
                      <li><a href="index_mp_classic_video_background.html">Classic</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Text Rotator Header</a>
                    <ul className="dropdown-menu">
                      <li><a href="index_mp_fullscreen_text_rotator.html">Fulscreen</a></li>
                      <li><a href="index_mp_classic_text_rotator.html">Classic</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Gradient Overlay Header</a>
                    <ul className="dropdown-menu">
                      <li><a href="index_mp_fullscreen_gradient_overlay.html">Fulscreen</a></li>
                      <li><a href="index_mp_classic_gradient_overlay.html">Classic</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Pages</a>
                <ul className="dropdown-menu">
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">About</a>
                    <ul className="dropdown-menu">
                      <li><a href="about1.html">About 1</a></li>
                      <li><a href="about2.html">About 2</a></li>
                      <li><a href="about3.html">About 3</a></li>
                      <li><a href="about4.html">About 4</a></li>
                      <li><a href="about5.html">About 5</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Services</a>
                    <ul className="dropdown-menu">
                      <li><a href="service1.html">Service 1</a></li>
                      <li><a href="service2.html">Service 2</a></li>
                      <li><a href="service3.html">Service 3</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Pricing</a>
                    <ul className="dropdown-menu">
                      <li><a href="pricing1.html">Pricing 1</a></li>
                      <li><a href="pricing2.html">Pricing 2</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Gallery</a>
                    <ul className="dropdown-menu">
                      <li><a href="gallery_col_2.html">2 Columns</a></li>
                      <li><a href="gallery_col_3.html">3 Columns</a></li>
                      <li><a href="gallery_col_4.html">4 Columns</a></li>
                      <li><a href="gallery_col_6.html">6 Columns</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Contact</a>
                    <ul className="dropdown-menu">
                      <li><a href="contact1.html">Contact 1</a></li>
                      <li><a href="contact2.html">Contact 2</a></li>
                      <li><a href="contact3.html">Contact 3</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Restaurant menu</a>
                    <ul className="dropdown-menu">
                      <li><a href="restaurant_menu1.html">Menu 2 Columns</a></li>
                      <li><a href="restaurant_menu2.html">Menu 3 Columns</a></li>
                    </ul>
                  </li>
                  <li><a href="login_register.html">Login / Register</a></li>
                  <li><a href="faq.html">FAQ</a></li>
                  <li><a href="404.html">Page 404</a></li>
                </ul>
              </li>
              <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Portfolio</a>
                <ul className="dropdown-menu" role="menu">
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Boxed</a>
                    <ul className="dropdown-menu">
                      <li><a href="portfolio_boxed_col_2.html">2 Columns</a></li>
                      <li><a href="portfolio_boxed_col_3.html">3 Columns</a></li>
                      <li><a href="portfolio_boxed_col_4.html">4 Columns</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Boxed - Gutter</a>
                    <ul className="dropdown-menu">
                      <li><a href="portfolio_boxed_gutter_col_2.html">2 Columns</a></li>
                      <li><a href="portfolio_boxed_gutter_col_3.html">3 Columns</a></li>
                      <li><a href="portfolio_boxed_gutter_col_4.html">4 Columns</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Full Width</a>
                    <ul className="dropdown-menu">
                      <li><a href="portfolio_full_width_col_2.html">2 Columns</a></li>
                      <li><a href="portfolio_full_width_col_3.html">3 Columns</a></li>
                      <li><a href="portfolio_full_width_col_4.html">4 Columns</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Full Width - Gutter</a>
                    <ul className="dropdown-menu">
                      <li><a href="portfolio_full_width_gutter_col_2.html">2 Columns</a></li>
                      <li><a href="portfolio_full_width_gutter_col_3.html">3 Columns</a></li>
                      <li><a href="portfolio_full_width_gutter_col_4.html">4 Columns</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Masonry</a>
                    <ul className="dropdown-menu">
                      <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Boxed</a>
                        <ul className="dropdown-menu">
                          <li><a href="portfolio_masonry_boxed_col_2.html">2 Columns</a></li>
                          <li><a href="portfolio_masonry_boxed_col_3.html">3 Columns</a></li>
                          <li><a href="portfolio_masonry_boxed_col_4.html">4 Columns</a></li>
                        </ul>
                      </li>
                      <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Full Width</a>
                        <ul className="dropdown-menu">
                          <li><a href="portfolio_masonry_full_width_col_2.html">2 Columns</a></li>
                          <li><a href="portfolio_masonry_full_width_col_3.html">3 Columns</a></li>
                          <li><a href="portfolio_masonry_full_width_col_4.html">4 Columns</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Hover Style</a>
                    <ul className="dropdown-menu">
                      <li><a href="portfolio_hover_black.html">Black</a></li>
                      <li><a href="portfolio_hover_gradient.html">Gradient</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Single</a>
                    <ul className="dropdown-menu">
                      <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Featured Image</a>
                        <ul className="dropdown-menu">
                          <li><a href="portfolio_single_featured_image1.html">Style 1</a></li>
                          <li><a href="portfolio_single_featured_image2.html">Style 2</a></li>
                        </ul>
                      </li>
                      <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Featured Slider</a>
                        <ul className="dropdown-menu">
                          <li><a href="portfolio_single_featured_slider1.html">Style 1</a></li>
                          <li><a href="portfolio_single_featured_slider2.html">Style 2</a></li>
                        </ul>
                      </li>
                      <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Featured Video</a>
                        <ul className="dropdown-menu">
                          <li><a href="portfolio_single_featured_video1.html">Style 1</a></li>
                          <li><a href="portfolio_single_featured_video2.html">Style 2</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Blog</a>
                <ul className="dropdown-menu" role="menu">
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Standard</a>
                    <ul className="dropdown-menu">
                      <li><a href="blog_standard_left_sidebar.html">Left Sidebar</a></li>
                      <li><a href="blog_standard_right_sidebar.html">Right Sidebar</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Grid</a>
                    <ul className="dropdown-menu">
                      <li><a href="blog_grid_col_2.html">2 Columns</a></li>
                      <li><a href="blog_grid_col_3.html">3 Columns</a></li>
                      <li><a href="blog_grid_col_4.html">4 Columns</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Masonry</a>
                    <ul className="dropdown-menu">
                      <li><a href="blog_grid_masonry_col_2.html">2 Columns</a></li>
                      <li><a href="blog_grid_masonry_col_3.html">3 Columns</a></li>
                      <li><a href="blog_grid_masonry_col_4.html">4 Columns</a></li>
                    </ul>
                  </li>
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Single</a>
                    <ul className="dropdown-menu">
                      <li><a href="blog_single_left_sidebar.html">Left Sidebar</a></li>
                      <li><a href="blog_single_right_sidebar.html">Right Sidebar</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Features</a>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="alerts-and-wells.html"><i className="fa fa-bolt"></i> Alerts and Wells</a></li>
                  <li><a href="buttons.html"><i className="fa fa-link fa-sm"></i> Buttons</a></li>
                  <li><a href="tabs_and_accordions.html"><i className="fa fa-tasks"></i> Tabs &amp; Accordions</a></li>
                  <li><a href="content_box.html"><i className="fa fa-list-alt"></i> Contents Box</a></li>
                  <li><a href="forms.html"><i className="fa fa-check-square-o"></i> Forms</a></li>
                  <li><a href="icons.html"><i className="fa fa-star"></i> Icons</a></li>
                  <li><a href="progress-bars.html"><i className="fa fa-server"></i> Progress Bars</a></li>
                  <li><a href="typography.html"><i className="fa fa-font"></i> Typography</a></li>
                </ul>
              </li>
              <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Shop</a>
                <ul className="dropdown-menu" role="menu">
                  <li className="dropdown"><a className="dropdown-toggle" href="#" data-toggle="dropdown">Product</a>
                    <ul className="dropdown-menu">
                      <li><a href="shop_product_col_3.html">3 columns</a></li>
                      <li><a href="shop_product_col_4.html">4 columns</a></li>
                    </ul>
                  </li>
                  <li><a href="shop_single_product.html">Single Product</a></li>
                  <li><a href="shop_checkout.html">Checkout</a></li>
                </ul>
              </li>
              <li className="dropdown"><a className="dropdown-toggle" href="documentation.html" data-toggle="dropdown">Documentation</a>
                <ul className="dropdown-menu">
                  <li><a href="documentation.html#contact">Contact Form</a></li>
                  <li><a href="documentation.html#reservation">Reservation Form</a></li>
                  <li><a href="documentation.html#mailchimp">Mailchimp</a></li>
                  <li><a href="documentation.html#gmap">Google Map</a></li>
                  <li><a href="documentation.html#plugin">Plugins</a></li>
                  <li><a href="documentation.html#changelog">Changelog</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

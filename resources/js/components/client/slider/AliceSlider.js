import React, {useRef} from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import {useCommonService} from '../../../hooks/HookManager'

export default function AliceSlider(props) {
  const CommonService = useCommonService()
  const data = props.data
  const length = data.length > 5 ? 5 : data.length
  const sliderRef = useRef(null)
  const settings = {
    items: renderContent(),
    autoPlayInterval: 2000,
    autoPlay: true,
    fadeOutAnimation: true,
    mouseTrackingEnabled: true,
    dotsDisabled: true,
    keysControlDisabled: true,
    buttonsDisabled: true,
    ref: (el) => (sliderRef.current = el),
    responsive: {
      0: { items: 1 },
      1024: { items: length }
    }
  }

  function renderContent() {
    return (
      data.map((prod, index) =>
        <div key={index}>
          <img alt={prod.name} src={CommonService.generateImageSrc('products', prod)} />
          <div className="glide__title">
            <h4 className="shop-item-title font-alt ml-10 mr-10 text-center">{prod.name}</h4>
            <p className="ml-10 mr-10 mb-10 text-center">{CommonService.formatMoney(prod.price, 0) + ' VNĐ'}</p>
          </div>
        </div>
      )
    )
  }

  const RenderArrows = () => {
    return (
      <div className="slider-arrow">
        <button className="arrow-btn prev" onClick={() => sliderRef.current.slidePrev()}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button className="arrow-btn next" onClick={() => sliderRef.current.slideNext()}>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    )
  }

  const handleOnDragStart = (e) => e.preventDefault()
  return (
    <div className="row slider-container">
      <RenderArrows/>
      <AliceCarousel {...settings}>
        {/* <img src="https://zicxaphotos.com/wp-content/uploads/2019/07/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg" onDragStart={handleOnDragStart} className="yours-custom-class" />
        <img src="https://zicxaphotos.com/wp-content/uploads/2019/07/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-1.jpg" onDragStart={handleOnDragStart} className="yours-custom-class" />
        <img src="https://zicxaphotos.com/wp-content/uploads/2019/07/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-2.jpg" onDragStart={handleOnDragStart} className="yours-custom-class" />
        <img src="https://zicxaphotos.com/wp-content/uploads/2019/07/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-3.jpg" onDragStart={handleOnDragStart} className="yours-custom-class" />
        <img src="https://zicxaphotos.com/wp-content/uploads/2019/07/Girl-xinh-cute.jpg" onDragStart={handleOnDragStart} className="yours-custom-class" />
        <img src="https://zicxaphotos.com/wp-content/uploads/2019/07/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-7.jpg" onDragStart={handleOnDragStart} className="yours-custom-class" /> */}
      </AliceCarousel>
    </div>
  )
}

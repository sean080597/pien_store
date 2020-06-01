import React, { useEffect } from 'react'
import CommonConstants from '../../config/CommonConstants'
import CommonService from '../../services/CommonService.service'
import glider from 'glider-js';
import 'glider-js/glider.min.css';

export default function GliderImages(props) {
    //methods
    const handleGlider = () => {
        new glider(document.querySelector('.glider'), {
            slidesToShow: 6,
            slidesToScroll: 6,
            draggable: false,
            dots: '#dots',
            arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
            }
        })
    }

    const handleCliclkOtherProduct = () => {
        console.log('clicked')
    }

    useEffect(() => {
        window.addEventListener('load', handleGlider())
        return () => {
            window.removeEventListener('load', handleGlider())
        }
    }, [props])
    return (
        <div className="glider-contain">
            <div className="glider">
            {
                props.relatedProducts.map(prod =>
                    <div key={prod.id} onClick={() => handleCliclkOtherProduct}>
                        <img alt={prod.name}
                        src={CommonService.generateImageSrc('products', prod)} />
                        <h4 className="shop-item-title font-alt">{prod.name}</h4>{CommonService.formatMoney(prod.price, 0) + ' VNĐ'}
                    </div>
                )
            }
            </div>

            <button role="button" aria-label="Previous" className="glider-prev hidden-xs"><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
            <button role="button" aria-label="Next" className="glider-next hidden-xs"><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
            <div role="tablist" id="dots" className="visible-xs"></div>
        </div>
    )
}

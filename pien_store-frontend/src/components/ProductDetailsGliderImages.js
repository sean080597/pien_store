import React, { useEffect } from 'react'
import CommonConstants from '../config/CommonConstants'
import CommonService from '../services/CommonService.service'
import glider from 'glider-js';
import 'glider-js/glider.min.css';

export default function GliderImages(props) {
    console.log('props chagned ==> ', props)
    //methods
    const handleGlider = () => {
        new glider(document.querySelector('.glider'), {
            slidesToShow: 5,
            slidesToScroll: 5,
            draggable: false,
            dots: '#dots',
            arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
            }
        })
    }

    useEffect(() => {
        window.addEventListener('load', handleGlider())
        return () => {
            window.removeEventListener('load', handleGlider())
        }
    }, [])
    return (
        <div className="glider-contain">
            <div className="glider">
                { props.children }
            </div>

            <button role="button" aria-label="Previous" className="glider-prev hidden-xs"><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
            <button role="button" aria-label="Next" className="glider-next hidden-xs"><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
            <div role="tablist" id="dots" className="visible-xs"></div>
        </div>
    )
}

import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class BottomLoading extends Component {
  render() {
    return (
      <div id="bottom-loading-component" className="bottom-loading">
        {/* <Loader type="Audio" color="#00BFFF" height={50} width={50} timeout={0} />
        <Loader type="BallTriangle" color="#00BFFF" height={50} width={50} timeout={0} />
        <Loader type="Bars" color="#00BFFF" height={50} width={50} timeout={0} />
        <Loader type="Circles" color="#00BFFF" height={50} width={50} timeout={0} />
        <Loader type="Grid" color="#00BFFF" height={50} width={50} timeout={0} />
        <Loader type="Hearts" color="#00BFFF" height={50} width={50} timeout={0} />
        <Loader type="Oval" color="#00BFFF" height={50} width={50} timeout={0} />
        <Loader type="Puff" color="#00BFFF" height={50} width={50} timeout={0} />
        <Loader type="Rings" color="#00BFFF" height={50} width={50} timeout={0} />
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} timeout={0} /> */}
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} timeout={0} />
      </div>
    )
  }
}

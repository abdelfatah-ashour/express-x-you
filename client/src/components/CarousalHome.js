import React from 'react';
import Style from '../styles/Carousal.module.css';

export default function CarousalHome() {
  return (
    <div
      id="carouselExampleControls"
      className={Style.carousalContainer + ' carousel slide'}
      data-bs-ride="carousel"
      data-interval="1000">
      <div className={Style.carousalInner + ' carousel-inner'}>
        <div className={Style.imageCarousalInner + ' carousel-item active'}>
          <img
            src="/images/carousal/carousal-1.jpg"
            className={Style.imageCarousalInner + ' d-block w-100'}
            alt="carousal item one"
            loading="lazy"
          />
        </div>
        <div className={Style.imageCarousalInner + ' carousel-item '}>
          <img
            src="/images/carousal/carousal-2.jpg"
            className={Style.imageCarousalInner + ' d-block w-100'}
            alt="carousal item two"
            loading="lazy"
          />
        </div>
        <div className={Style.imageCarousalInner + ' carousel-item '}>
          <img
            src="/images/carousal/carousal-3.jpg"
            className={Style.imageCarousalInner + ' d-block w-100'}
            alt="carousal item three"
            loading="lazy"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

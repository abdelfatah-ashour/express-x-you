// import Swiper core and required modules
import React from 'react';
import SwiperCore, { Navigation, A11y, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Style from '../styles/TopTrend.module.css';
import { API } from '../utilities/KEYS';

// install Swiper modules
SwiperCore.use([Navigation, A11y, Controller]);

const TopTrend = ({ topTrends }) => {
  return (
    <>
      <h6 className={Style.labelTop}>Most Popular</h6>
      <Swiper
        className={Style.TopTrend}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 5.5,
            spaceBetween: 25,
          },
        }}>
        {topTrends.map(item => {
          return (
            <SwiperSlide className={Style.OneTrend} key={item._id}>
              <div className={Style.wrapperImg}>
                <img
                  src={`${API}/${item.imageItem}`}
                  alt={item.nameItem}
                  loading="lazy"
                />
              </div>
              <div className={Style.wrapperInfo}>
                <h6>{item.nameItem}</h6>
                <strong>{item.price}</strong>$
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default TopTrend;

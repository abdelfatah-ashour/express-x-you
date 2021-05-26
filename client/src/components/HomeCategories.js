import React from 'react';
import Link from 'next/link';
import Style from '../styles/Home.module.css';

export default function HomeCategories() {
  return (
    <section
      className={
        Style.categories + ' row d-flex flex-wrap justify-content-evenly'
      }>
      <Link href="/items/electronics?section=camera&page=1&price=all&brand=all&color=all&date=newest">
        <div className={Style.category + ' col-md-2 col-5 m-auto mb-3'}>
          <div className={Style.containerImgCategory}>
            <img
              src="/images/sections/camera.jpg"
              className="w-100 h-100"
              alt=""
              loading="lazy"
            />
          </div>
          <span>camera</span>
        </div>
      </Link>
      <Link href="/items/electronics?section=tv&page=1&price=all&brand=all&color=all&date=newest">
        <div className={Style.category + ' col-md-2 col-5 m-auto mb-3'}>
          <div className={Style.containerImgCategory + ' w-100 h-100'}>
            <img
              src="/images/sections/tv.jpg"
              className="w-100 h-100"
              alt=""
              loading="lazy"
            />
          </div>
          <span className="text-center">TV</span>
        </div>
      </Link>
      <Link href="/items/electronics?section=mobiles&page=1&price=all&brand=all&color=all&date=newest">
        <div className={Style.category + ' col-md-2 col-5 m-auto mb-3'}>
          <div className={Style.containerImgCategory + ' w-100 h-100'}>
            <img
              src="/images/sections/mobile phone.jpg"
              className="w-100 h-100"
              alt=""
              loading="lazy"
            />
          </div>
          <span>Mobile Phone</span>
        </div>
      </Link>
      <Link href="/items/electronics?section=laptops&page=1&price=all&brand=all&color=all&date=newest">
        <div className={Style.category + ' col-md-2 col-5 m-auto mb-3'}>
          <div className={Style.containerImgCategory + ' w-100 h-100'}>
            <img
              src="/images/sections/laptops.jpg"
              className="w-100 h-100"
              alt=""
              loading="lazy"
            />
          </div>
          <span>Laptops</span>
        </div>
      </Link>
    </section>
  );
}

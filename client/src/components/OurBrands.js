import React from 'react';
import Style from '../styles/Home.module.css';

const ourBrands = [
  { brand: 'APPLE', img: '/images/brands/apple.jpeg' },
  { brand: 'SAMSUNG', img: '/images/brands/samsung.png' },
  { brand: 'HUAWEI', img: '/images/brands/huawei.png' },
  { brand: 'OPPO', img: '/images/brands/oppo.jfif' },
  { brand: 'XIAOMI', img: '/images/brands/xiaomi.png' },
  { brand: 'KODAK', img: '/images/brands/kodak.png' },
  { brand: 'CANON', img: '/images/brands/canon.jpg' },
  { brand: 'DELL', img: '/images/brands/dell.jpg' },
  { brand: 'HP', img: '/images/brands/hp.png' },
];

export default function OurBrands() {
  return (
    <>
      <h3 className={Style.ourBrands}>our brands</h3>
      <div className={Style.listBrands + ' row justify-content-evenly'}>
        {ourBrands.map((brand, i) => {
          return (
            <div className={Style.brand} key={i}>
              <img src={`${brand.img}`} alt={brand.brand} loading="lazy" />
            </div>
          );
        })}
      </div>
    </>
  );
}

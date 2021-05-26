import React, { useContext } from 'react';
import Link from 'next/link';
import Style from '../styles/card.module.css';
import axios from '../utilities/axios';
import { ToastSuccess, ToastWarning } from '../utilities/Toaster';
import { RiHeartAddLine, RiAddLine } from 'react-icons/ri';
import { AuthStore } from '../context-api/Auth.context';
import { API } from '../utilities/KEYS';

export default function Card({ product }) {
  const { _id, category, nameItem, price, imageItem, color } = product;
  const { Auth } = useContext(AuthStore);

  const handleAddToCart = async productId => {
    try {
      await axios
        .post('/api/cart', { productId })
        .then(({ data }) => {
          ToastSuccess(data.message);
        })
        .catch(error => {
          if (!error.response) {
            throw new Error(error);
          } else {
            ToastWarning(error.response.data.message);
          }
        });
    } catch (error) {
      alert('something went wrong!');
    }
  };

  const handleAddToWishList = async id => {
    try {
      await axios
        .post('/api/wishlist', { itemId: id })
        .then(({ data }) => {
          ToastSuccess(data.message);
        })
        .catch(error => {
          if (!error.response) {
            throw new Error(error);
          } else {
            ToastWarning(error.response.data.message);
          }
        });
    } catch (error) {
      alert('something went wrong!');
    }
  };

  return (
    <div className={Style.cardItem + ' col-lg-2 col-sm-3 col-5 mx-2'}>
      <div
        className={Style.currentColor}
        style={{ backgroundColor: '#' + color }}
        data-color="color"></div>
      <div className={Style.imageOfCard}>
        <img src={`${API}/${imageItem}`} alt={nameItem} loading="lazy" />
      </div>
      {Auth.isAuth && (
        <div className={Style.optionList}>
          <div onClick={() => handleAddToCart(product._id)}>
            <RiAddLine />
          </div>
          <div className="divider"></div>
          <div onClick={() => handleAddToWishList(product._id)}>
            <RiHeartAddLine />
          </div>
        </div>
      )}

      <Link href={`/items/${category}/${_id}`}>
        <a className={Style.itemDetails}>Item details 👁</a>
      </Link>
      <div className={Style.infoAboutItem}>
        <h6>{nameItem}</h6>
        <span className={Style.price}>{price}</span> <b>$</b>
      </div>
    </div>
  );
}

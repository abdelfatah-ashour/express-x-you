import React from 'react';
import Style from '../styles/Order.module.css';
import { API } from '../utilities/KEYS';

export default function OneItem({ oneItem }) {
  return (
    <div
      className={
        Style.wrapperOneItem +
        ' d-flex justify-content-evenly align-items-center mb-2 p-2'
      }
      key={oneItem._id}>
      <div className={Style.wrapperImage + ' col-md-6'}>
        <img
          src={`${API}/${oneItem.product.imageItem}`}
          alt={oneItem.product.nameItem}
          loading="lazy"
          className="w-100 h-auto"
        />
      </div>
      <ul className={Style.wrapperInfo}>
        <li>
          Name :<strong>{oneItem.product.nameItem}</strong>
        </li>
        <li>
          Price : <strong>{oneItem.product.price} $ </strong>
        </li>
        <li>
          QTY : <strong>{oneItem.qty}</strong>
        </li>
        <li>
          Total Amount :<strong>{oneItem.amount} $ </strong>
        </li>
      </ul>
    </div>
  );
}

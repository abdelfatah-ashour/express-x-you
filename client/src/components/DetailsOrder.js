import React from 'react';
import OneItem from '../components/OneItem';
import Style from '../styles/Order.module.css';
import { AiOutlineClose } from 'react-icons/ai';

export default function DetailsOrder({ items, disShowOrderInfo }) {
  return (
    <div className="row">
      <div className={Style.parentDetailsOrder}>
        <div
          className={Style.CloseInfo}
          onClick={() => disShowOrderInfo({ type: 'HIDE', payload: false })}>
          <span>
            <AiOutlineClose />
          </span>
        </div>
        <div className="row">
          {items.map((oneItem, i) => {
            return <OneItem key={i} oneItem={oneItem} />;
          })}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Style from '../styles/dashboard.module.css';
import { AiOutlineClose } from 'react-icons/ai';

export default function InfoOneOrder({ displayOneOrderInfo, items }) {
  return (
    <td className={Style.InfoOneOrder}>
      <div
        className={Style.closeIcon}
        onClick={() => displayOneOrderInfo({ type: 'HIDE', payload: false })}>
        <span>
          <AiOutlineClose />
        </span>
      </div>
      <div className={Style.listItemsInfo}>
        {items.map(item => {
          return (
            <ul key={item._id}>
              <li>
                # <strong>{item._id}</strong>
              </li>
              <li>
                Name : <strong>{item.nameItem}</strong>
              </li>
              <li>
                Price : <strong>{item.price}</strong>
              </li>
              <li>
                QTY : <strong>{item.qty}</strong>
              </li>
              <li>
                Total : <strong>{item.total}</strong>
              </li>
            </ul>
          );
        })}
      </div>
    </td>
  );
}

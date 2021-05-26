import React, { useReducer } from 'react';
import { GiMatterStates } from 'react-icons/gi';
import { BsInfoCircleFill } from 'react-icons/bs';
import { handleDisplay } from '../context-api/reducers';
import StateOrder from '../components/StateOrder';
import InfoOneOrder from '../components/InfoOneOrder';
import Style from '../styles/dashboard.module.css';

export default function TableOfCP({ orders }) {
  const [display, displayOrderState] = useReducer(handleDisplay, false);

  const [oneOrderInfo, displayOneOrderInfo] = useReducer(handleDisplay, false);

  return (
    <table className="table">
      <thead className="table-dark">
        <tr className="text-center">
          <th scope="col">#</th>
          <th scope="col">full name</th>
          <th scope="col">items</th>
          <th scope="col">state</th>
          <th scope="col">manage</th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map(order => {
            return (
              <tr className="text-center" key={order._id}>
                <th scope="row">1</th>
                <td>user name</td>
                <td
                  className={Style.itemsInfoIcon}
                  onClick={() =>
                    displayOneOrderInfo({ type: 'SHOW', payload: true })
                  }>
                  <BsInfoCircleFill />
                </td>
                <td>SHIPPED</td>
                <td
                  onClick={() =>
                    displayOrderState({ type: 'SHOW', payload: true })
                  }
                  className={Style.stateIcon}>
                  <GiMatterStates />
                </td>
                {display && (
                  <StateOrder
                    displayOrderState={displayOrderState}
                    orderId={order._id}
                    stateOrder={order.stateOrder}
                    state={order.stateOrder}
                    bayerId={order.bayerId}
                  />
                )}
                {oneOrderInfo && (
                  <InfoOneOrder
                    displayOneOrderInfo={displayOneOrderInfo}
                    items={order.items}
                  />
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

import React, { useEffect, useReducer } from 'react';
import { ImCheckboxChecked } from 'react-icons/im';
import {
  AiOutlineDeliveredProcedure,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import { FcShipped } from 'react-icons/fc';
import { RiTimerFill } from 'react-icons/ri';
import { GiTrophyCup } from 'react-icons/gi';
import { FiHash } from 'react-icons/fi';
import Style from '../styles/Order.module.css';
import DetailsOrder from '../components/DetailsOrder';
import { handleDisplay } from '../context-api/reducers';

export default function OneOrder({ order }) {
  const [display, disShowOrderInfo] = useReducer(handleDisplay, false);

  useEffect(() => {
    let popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    popoverTriggerList.map(function (popoverTriggerEl) {
      // eslint-disable-next-line no-undef
      return new bootstrap.Popover(popoverTriggerEl);
    });
    return () => null;
  }, []);

  return (
    <div className={Style.parentOneOrder}>
      {display && (
        <DetailsOrder items={order.items} disShowOrderInfo={disShowOrderInfo} />
      )}

      <div className="w-100 d-flex justify-content-between align-items-center">
        <div>
          <FiHash /> <strong>{order._id}</strong>
        </div>
        <div className="text-end">
          <span
            className={Style.infoIcon}
            onClick={() => disShowOrderInfo({ type: 'SHOW', payload: true })}>
            <AiOutlineInfoCircle />
          </span>
        </div>
      </div>
      <div
        className={
          Style.oneOrder +
          ' w-75 d-flex justify-content-evenly align-items-center mx-auto my-3 p-2'
        }>
        <span
          className={Style.stateOrder + ' d-inline-block'}
          tabIndex="0"
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-content="Accepted"
          data-bs-placement="top">
          <button
            className="btn"
            type="button"
            disabled={order.stateOrder >= 1 ? false : true}
            style={{
              color: order.stateOrder >= 1 ? 'green' : 'var(--firstColor)',
            }}>
            <ImCheckboxChecked />
          </button>
        </span>
        <hr className="col my-auto" />
        <span
          className={Style.stateOrder + ' d-inline-block'}
          tabIndex="0"
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-content="In progress"
          data-bs-placement="top">
          <button
            className="btn"
            type="button"
            disabled={order.stateOrder >= 2 ? false : true}
            style={{
              color: order.stateOrder >= 2 ? 'green' : 'var(--firstColor)',
            }}>
            <RiTimerFill />
          </button>
        </span>
        <hr className="col my-auto" />
        <span
          className={Style.stateOrder + ' d-inline-block'}
          tabIndex="0"
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-content="Shipped"
          data-bs-placement="top">
          <button
            className="btn"
            type="button"
            disabled={order.stateOrder >= 3 ? false : true}
            style={{
              color: order.stateOrder >= 3 ? 'green' : 'var(--firstColor)',
            }}>
            <FcShipped />
          </button>
        </span>
        <hr className="col my-auto" />
        <span
          className={Style.stateOrder + ' d-inline-block'}
          tabIndex="0"
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-content="Delivered"
          data-bs-placement="top">
          <button
            className="btn"
            type="button"
            disabled={order.stateOrder >= 4 ? false : true}
            style={{
              color: order.stateOrder >= 4 ? 'green' : 'var(--firstColor)',
            }}>
            <AiOutlineDeliveredProcedure />
          </button>
        </span>
        <hr className="col my-auto" />
        <span
          className={Style.stateOrder + ' d-inline-block'}
          tabIndex="0"
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-content="Completed"
          data-bs-placement="top">
          <button
            className="btn"
            type="button"
            disabled={order.stateOrder === 5 ? false : true}
            style={{
              color: order.stateOrder === 5 ? 'green' : 'var(--firstColor)',
            }}>
            <GiTrophyCup />
          </button>
        </span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import Style from '../styles/dashboard.module.css';
import { socket } from '../utilities/Socket.io-client';

export default function StateOrder({
  displayOrderState,
  orderId,
  state,
  bayerId,
}) {
  const [stateOrder, setStateOrder] = useState('');

  const handleChangeState = e => {
    setStateOrder(e.target.value);
  };

  const changedState = () => {
    socket.emit('changeOrderState', {
      orderId: orderId,
      state: stateOrder,
      bayerId: bayerId,
    });

    displayOrderState({ type: 'HIDE', payload: false });
  };

  return (
    <td className={Style.StateOrder}>
      <div className={Style.cancel}>
        <span
          className={Style.closeView}
          onClick={() => displayOrderState({ type: 'HIDE', payload: false })}>
          <ImCancelCircle />
        </span>
      </div>
      <select
        className="form-select w-75 mx-auto"
        aria-label="Default select example"
        onChange={handleChangeState}>
        <option disabled>Open this select menu</option>
        <option value={1} disabled={1 < state}>
          purchased
        </option>
        <option value={2} disabled={2 < state}>
          processing
        </option>
        <option value={3} disabled={3 < state}>
          shipped
        </option>
        <option value={4} disabled={4 < state}>
          delivered
        </option>
        <option value={5} disabled={5 === state}>
          complete
        </option>
      </select>
      <button className="btn btn-dark px-4 m-2" onClick={changedState}>
        ok
      </button>
    </td>
  );
}

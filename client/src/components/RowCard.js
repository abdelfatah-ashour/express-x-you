import React, { useReducer, useState } from 'react';
import { ToastWarning, ToastSuccess, ToastError } from '../utilities/Toaster';
import { handleDisplay, handleChangeQTY } from '../context-api/reducers';
import axios from '../utilities/axios';
import Style from '../styles/card.module.css';
import { API } from '../utilities/KEYS';
import { useRouter } from 'next/router';
import { AiTwotoneDelete } from 'react-icons/ai';

export default function RowCard({ cart, cartId }) {
  const Router = useRouter();
  const [qty, setQty] = useState(cart.qty);
  const initNewQty = 0;
  const [newQty, disChangeQTY] = useReducer(handleChangeQTY, initNewQty);

  const [edit, disShowCTRL] = useReducer(handleDisplay, false);

  const handleEditQty = async (cartId, productId, newCount) => {
    await axios
      .post('/api/cart/edit', { cartId, productId, newCount })
      .then(({ data }) => {
        ToastSuccess(data.message);
        disChangeQTY({ type: 'RESET' });
        Router.push('/cart');
      })
      .catch(error => {
        if (!error.response) {
          ToastWarning('something went wrong!');
        } else {
          Router.push('/cart');
          ToastError(error.response.data.message);
        }
      });
  };

  const handleDeleteOneItem = async cartId => {
    await axios
      .put('/api/cart', { cartId })
      .then(({ data }) => {
        ToastSuccess(data.message);
        disChangeQTY({ type: 'RESET' });
        Router.push('/cart');
      })
      .catch(error => {
        if (!error.response) {
          ToastWarning('something went wrong!');
        } else {
          Router.push('/cart');
          ToastError(error.response.data.message);
        }
      });
  };

  return (
    <div className={Style.rowCart + ' row'}>
      {/* wrapper image */}
      <div className="col-md-3 col-12 d-flex flex-wrap justify-content-start align-items-center p-3">
        <div className={Style.containerImg}>
          <img
            src={`${API}/${cart.product.imageItem}`}
            alt={cart.product.nameItem}
          />
        </div>
      </div>

      {/* details */}
      <div className="col-md-5 col-12 d-flex flex-column p-3">
        <span className="w-100 mb-2">NAME : {cart.product.nameItem}</span>
        <span className="w-100 mb-2">
          PRICE : <strong>{cart.product.price}$</strong>
        </span>
        <span className="w-100 mb-2">
          QTY : ( <strong> {qty}</strong> )
        </span>
        <span className="w-100 mb-2">
          TOTAL : <strong>{cart.product.price * qty}</strong>$
        </span>
      </div>

      {/* editing */}
      <div className="col-md-2 col-6 d-flex justify-content-evenly align-items-center p-3">
        {!edit && (
          <button
            className="btn btn-dark"
            onClick={() => disShowCTRL({ type: 'SHOW', payload: true })}>
            edit
          </button>
        )}
        {edit && (
          <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <div className="w-100 d-flex justify-content-evenly align-items-center m-1">
              <button
                className="btn"
                onClick={() => {
                  setQty(qty - 1);
                  disChangeQTY({ type: 'DEC', payload: 1 });
                }}
                disabled={qty === 1}>
                -
              </button>
              <span>{qty}</span>
              <button
                className="btn"
                onClick={() => {
                  setQty(qty + 1);
                  disChangeQTY({ type: 'INC', payload: 1 });
                }}
                disabled={cart.product.qty === newQty}>
                +
              </button>
            </div>
            <div className="w-100 d-flex justify-content-evenly align-items-center m-1">
              <button
                className="btn btn-success m-1"
                onClick={() => {
                  handleEditQty(cartId, cart.product._id, newQty);
                }}>
                Done
              </button>
              <button
                className="btn btn-dark m-1"
                onClick={() => {
                  setQty(cart.qty);
                  disShowCTRL({ type: 'HIDE', payload: false });
                }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* delete one item from cart */}
      <div className="col-md-2 col-6 d-flex justify-content-evenly align-items-center p-3">
        <button
          className="btn btn-danger"
          onClick={() => {
            handleDeleteOneItem(cartId);
          }}>
          <AiTwotoneDelete />
        </button>
      </div>
    </div>
  );
}

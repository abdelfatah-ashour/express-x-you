import React, { useEffect } from 'react';
import axios from '../utilities/axios';
import { useRouter } from 'next/router';
import { ToastSuccess, ToastWarning, ToastError } from '../utilities/Toaster';
export default function PaypalButton({ shippedInfo, items, amount }) {
  const Router = useRouter();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(async function (details) {
            await axios
              .post('/api/order', {
                paymentId: details.id,
                ...shippedInfo,
                items,
              })
              .then(({ data }) => {
                ToastSuccess(data.message);
                Router.push('/MyOrder');
              })
              .catch(error => {
                if (!error.response) {
                  ToastWarning(error.message);
                } else {
                  ToastError(error.response.data.message);
                }
              });
          });
        },
        onError: function (error) {
          console.log('Error : ', error.message);
        },
        onCancel: function () {
          alert('order is canceled');
        },
      })
      .render('#paypal-button-container');
    return () => {
      return;
    };
  }, []);

  return <div id="paypal-button-container"></div>;
}

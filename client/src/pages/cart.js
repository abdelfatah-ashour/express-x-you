import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import RowCard from '../components/RowCard';
import axios from '../utilities/axios';
// import Error from 'next/error';
import CheckoutStepper from '../components/CheckoutStepper';
import Style from '../styles/card.module.css';

export default function cart({ cart, error, cookies }) {
    console.log('Error : ', error);
    console.log('COOKIES : ', { cookies });
    const [totalAmount, setTotalAmount] = useState(0);
    const [items, setItems] = useState([]);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (cart && cart.length > 0) {
            const result = cart.map(item => {
                return {
                    product: item.product._id,
                    qty: item.qty,
                    amount: item.qty * item.product.price,
                };
            });

            const total = result.reduce((acc, cur) => {
                return acc + cur.amount;
            }, 0);
            setItems(result);
            setTotalAmount(total);
        }
        return () => {
            return;
        };
    }, []);

    // reduce total amount

    return (
        <Layout title="CART">
            <main className="container">
                {cart &&
                    !checked &&
                    cart.length > 0 &&
                    cart.map((item, i) => {
                        return (
                            <RowCard cart={item} key={i} cartId={cart[0]._id} />
                        );
                    })}

                {(!cart || cart.length === 0) && (
                    <div className="w-100 my-auto">
                        <div
                            className="alert alert-secondary text-center"
                            role="alert">
                            your cart is empty 📪
                        </div>
                    </div>
                )}

                {items.length > 0 && (
                    <div
                        className={
                            Style.wrapperCheckout +
                            ' w-100 d-flex justify-content-end'
                        }>
                        <div className="w-25 d-flex flex-column justify-content-evenly">
                            <span>
                                total amount : <strong>{totalAmount}</strong>$
                            </span>
                            <span>payment with : Paypal</span>
                        </div>
                        <div className="w-25 d-flex justify-content-evenly align-items-center">
                            {!checked ? (
                                <button
                                    className="btn btn-warning"
                                    onClick={() => setChecked(true)}>
                                    checkout
                                </button>
                            ) : (
                                <CheckoutStepper
                                    setChecked={setChecked}
                                    items={items}
                                    amount={totalAmount}
                                />
                            )}
                        </div>
                    </div>
                )}
                {/*
                {!cart && (
                    <Error
                        statusCode={500}
                        title={'🥱 Something Went Wrong!'}
                    />
                )} */}
            </main>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    if (!ctx.req.cookies.user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    } else {
        return await axios
            .get('/api/cart', {
                headers: {
                    authorization: ctx.req.cookies.auth,
                },
            })
            .then(({ data }) => {
                return {
                    props: {
                        cart: data.message,
                        error: null,
                        cookies: ctx.req,
                    },
                };
            })
            .catch(error => {
                return {
                    props: {
                        cart: null,
                        error: error,
                        cookies: ctx.req,
                    },
                };
            });
    }
}

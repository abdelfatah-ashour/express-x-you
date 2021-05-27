import React, { useContext, useEffect } from 'react';
import { OrderStore } from '../context-api/order.context';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import Layout from '../components/Layout';
import OneOrder from '../components/OneOrder';
import axios from '../utilities/axios';
import Error from 'next/error';

export default function MyOrders({ orders, errorAPI }) {
    const { setOrder } = useContext(OrderStore);

    useEffect(() => {
        if (orders.length > 0) {
            setOrder(orders);
        }
        return () => null;
    }, []);

    return (
        <Layout title="My Order">
            {orders && orders.length > 0 && (
                <>
                    <h4 className="text-center my-5 p-3">
                        <RiShoppingBag3Fill /> your orders
                    </h4>
                    {orders.map(order => {
                        return <OneOrder key={order._id} order={order} />;
                    })}
                </>
            )}

            {orders && orders.length === 0 && (
                <div className="w-100">
                    <div
                        className="alert alert-secondary text-center my-5"
                        role="alert">
                        you don&apos;t have any order 📪
                    </div>
                </div>
            )}

            {errorAPI && (
                <Error statusCode="500" title="🥱 Something Went Wrong!" />
            )}
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    if (!ctx.req.cookies.c_user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    } else {
        return await axios
            .get('/api/order', {
                headers: { authorization: ctx.req.cookies.c_user },
            })
            .then(({ data }) => {
                return {
                    props: {
                        orders: data.message,
                        errorAPI: null,
                    },
                };
            })
            .catch(() => {
                return {
                    props: {
                        order: null,
                        errorAPI: true,
                    },
                };
            });
    }
}

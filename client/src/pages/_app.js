import React from 'react';
import { AuthProvider } from '../context-api/Auth.context';
import { OrderProvider } from '../context-api/order.context';
import { CartProvider } from '../context-api/cart.context';
import { CreateItemProvider } from '../context-api/CreateItem.context';
import '../styles/global.css';
import 'react-phone-number-input/style.css';
import '../styles/Navbar.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.css';

export default function App(props) {
    const { Component, pageProps } = props;

    return (
        <AuthProvider>
            <OrderProvider>
                <CartProvider>
                    <CreateItemProvider>
                        <Component {...pageProps} />
                    </CreateItemProvider>
                </CartProvider>
            </OrderProvider>
        </AuthProvider>
    );
}

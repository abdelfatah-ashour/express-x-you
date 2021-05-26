/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="Description" content={description} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        {/* brand google font */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <TopBar />
      <Navbar />
      <main style={{ minHeight: '400px' }}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="container">
          {children}
          <Link href="/">
            <a className="btn rootHome">🏠</a>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

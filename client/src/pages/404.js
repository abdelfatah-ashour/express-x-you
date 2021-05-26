import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Layout title="404 | Page Not Found">
      <div className="container">
        <div
          style={{ minHeight: '500px', width: '100%' }}
          className="d-flex flex-column justify-content-center align-items-center">
          <div className="h-100">
            <img
              src="/images/404.png"
              alt="404 | page not found"
              className="w-100 h-auto"
              style={{ borderRadius: '.5rem' }}
            />
          </div>
          <p className="lead m-2 p-2">
            <strong>404</strong> | page not found .. return to{'  '}
            <Link href="/">
              <a aria-label="Home page">Home Page</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

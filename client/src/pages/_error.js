import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

function Error({ statusCode }) {
  return (
    <Layout title="404 | Page Not Found">
      <div className="container">
        <div
          style={{ minHeight: '500px', width: '100%' }}
          className="d-flex flex-column justify-content-center align-items-center">
          <p>
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </p>
          <p className="lead m-2 p-2">
            ⚠ something went wrong{'  '}
            <Link href="/">
              <a aria-label="Home page">Home Page</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

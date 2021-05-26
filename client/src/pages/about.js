import React from 'react';
import Layout from '../components/Layout';

export default function about() {
  return (
    <Layout>
      <p className="lead">about page</p>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

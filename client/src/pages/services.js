import React from 'react';
import Layout from '../components/Layout';
import Style from '../styles/Services.module.css';
import { GrServicePlay, GrBusinessService } from 'react-icons/gr';
import { RiServiceFill } from 'react-icons/ri';
import { FcServices } from 'react-icons/fc';

export default function services() {
  return (
    <Layout title="Services" description="">
      <div className="container mt-4">
        <div className={Style.Service + ' row'}>
          <div className="col-md-6 col-12 align-items-center">
            <h3>What is EXPRESS X YOU?</h3>
            <p className="lead">
              EXPRESS X YOU, also known as electronic commerce or internet
              commerce, refers to the buying and selling of goods or services
              using the internet, and the transfer of money and data to execute
              these transactions. EXPRESS X YOU is often used to refer to the
              sale of physical products online, but it can also describe any
              kind of commercial transaction that is facilitated through the
              internet.
            </p>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-center">
            <div style={{ fontSize: '5rem', padding: 0, margin: 0 }}>
              <RiServiceFill />
            </div>
          </div>
        </div>
        <div className={Style.Service + ' row'}>
          <div className="col-md-6 col-12 p-2 d-flex flex-column">
            <h3>Business to Consumer (B2C)</h3>
            <p className="lead">
              When a business sells a good or service to an individual consumer
              (e.g. You buy a pair of Electronics from an online retailer).
            </p>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-center">
            <div style={{ fontSize: '5rem' }}>
              <GrBusinessService />
            </div>
          </div>
        </div>
        <div className={Style.Service + ' row'}>
          <div className="col-md-6 col-12  p-2">
            <h3>Business to Business (B2B)</h3>
            <p className="lead">
              When a business sells a good or service to another business (e.g.
              A business sells software-as-a-service for other businesses to
              use)
            </p>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-center">
            <div style={{ fontSize: '5rem' }}>
              <FcServices />
            </div>
          </div>
        </div>
        <div className={Style.Service + ' row'}>
          <div className="col-md-6 col-12 p-2">
            <h3>Consumer to Consumer (C2C)</h3>
            <p className="lead">
              When a consumer sells a good or service to another consumer (e.g.
              You sell your old furniture on eBay to another consumer).
            </p>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-center">
            <div style={{ fontSize: '5rem', padding: '1rem' }}>
              <GrServicePlay />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

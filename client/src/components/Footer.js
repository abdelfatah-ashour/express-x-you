import React from 'react';
import Style from '../styles/Footer.module.css';
import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className={Style.Footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-12 h-100 d-flex justify-content-center pt-3">
            <div className={Style.listFooter + ' col-6'}>
              <h6 className="w-100">shop with section</h6>
              <Link href="/items/electronics?section=mobiles">
                <a aria-label="section mobiles w-100">Mobile Phone</a>
              </Link>
              <Link href="/items/electronics?section=laptops">
                <a aria-label="section laptops" className="w-100">
                  Laptops
                </a>
              </Link>
              <Link href="/items/electronics?section=camera">
                <a aria-label="section camera" className="w-100">
                  camera
                </a>
              </Link>
              <Link href="/items/electronics?section=tv">
                <a aria-label="section tv" className="w-100">
                  TV
                </a>
              </Link>
            </div>
            <div className={Style.listFooter + ' col-6'}>
              <h6 className="w-100">features</h6>
              <Link href="/sale-item">
                <a aria-label="section tv" className="w-100">
                  Sale new Items
                </a>
              </Link>
              <Link href="/cart">
                <a aria-label="cart" className="w-100">
                  cart
                </a>
              </Link>
              <Link href="/MyOrders">
                <a aria-label="My Orders" className="w-100">
                  State orders
                </a>
              </Link>
            </div>
          </div>
          <div className="col-md-4 col-12 d-flex flex-column justify-content-center align-items-center mt-3 py-3">
            <div className={Style.linksMedia}>
              <a
                aria-label="My Orders"
                className="w-100 mx-2"
                href="https://www.facebook.com">
                <FaFacebookF />
              </a>

              <a
                aria-label="My Orders"
                className="w-100 mx-2"
                href="https://www.twitter.com">
                <AiOutlineTwitter />
              </a>

              <a
                aria-label="My Orders"
                className="w-100 mx-2"
                href="https://www.instagram.com">
                <FiInstagram />
              </a>
            </div>
            <small className="p-2 mt-2">
              © EXPRESS X YOU ,2021. All Rights Reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

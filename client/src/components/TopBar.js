import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { getJSON, remove } from 'js-cookie';
import { AiOutlineLogin } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { AiOutlineShopping } from 'react-icons/ai';
import { GiMatterStates } from 'react-icons/gi';
import { AuthStore } from '../context-api/Auth.context';
import { GoSettings } from 'react-icons/go';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiHeartAddLine } from 'react-icons/ri';
import { socket } from '../utilities/Socket.io-client';
import { ToastSuccess } from '../utilities/Toaster';
import Style from '../styles/TopBar.module.css';
import axios from '../utilities/axios';

export default function TopBar() {
  const piCookie = getJSON('pi');
  const { Auth, setAuth } = useContext(AuthStore);
  const [Notification, setNotification] = useState([]);

  socket.on('newNotification', data => {
    setNotification([...Notification, data]);
  });

  const submitLogout = async () => {
    try {
      await axios
        .get('/api/auth/logout')
        .then(({ data }) => {
          remove('auth');
          remove('admin');
          remove('pi');
          setAuth({
            isAuth: false,
            _id: false,
            username: false,
            email: false,
            role: false,
          });
          ToastSuccess(data.message);
        })
        .catch(error => {
          throw new Error(error);
        });
    } catch (error) {
      window.alert(error.message);
    }
  };

  // check if user authenticate
  useEffect(() => {
    if (!piCookie) {
      setAuth({
        isAuth: false,
        _id: false,
        username: false,
        email: false,
        role: false,
      });
    } else {
      setAuth({
        isAuth: true,
        _id: piCookie._id,
        username: piCookie.username,
        email: piCookie.email,
        role: piCookie.role,
      });
    }
    return () => null;
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center pt-2">
      <div className="w-25 text-start">
        <ul className={Style.listSocialMedia + ' d-flex m-0'}>
          <li className="me-3">
            <a href="https://www.facebook.com" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </li>
          <li className="me-3">
            <a href="https://www.twitter.com" aria-label="Twitter">
              <FaTwitter />
            </a>
          </li>
          <li className="me-3">
            <a href="https://www.instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
          </li>
        </ul>
      </div>
      <div className="px-3 d-flex justify-content-around">
        {Auth.isAuth && Auth.role === 0 && (
          <>
            <div className={Style.cartIcon + ' m-1'}>
              <Link href="/cart">
                <a className="me-3">
                  <AiOutlineShopping />
                </a>
              </Link>
            </div>

            {/* start notification */}
            <div className={Style.notification + ' dropdown m-1'}>
              <button
                className={Style.toggle + ' btn btn-dark dropdown-toggle p-1'}
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <IoMdNotificationsOutline />
              </button>
              <ul
                className={Style.dropdownMenu + ' dropdown-menu'}
                aria-labelledby="dropdownMenuButton1">
                {Notification.length > 0 &&
                  Notification.map((oneNotification, i) => {
                    return (
                      <li key={i}>
                        <a className="dropdown-item" href="#">
                          {oneNotification.content}
                        </a>
                      </li>
                    );
                  })}
                {Notification.length === 0 && (
                  <li>
                    <small>you don&apos;t have notification</small>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
        {Auth.isAuth && (
          <div className={Style.options + ' dropdown m-1'}>
            <button
              className={Style.toggle + ' btn btn-dark dropdown-toggle p-1'}
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <GoSettings />
            </button>
            <ul
              className={Style.dropdownMenu + ' dropdown-menu'}
              aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="/sale-item">
                  <HiOutlineViewGridAdd /> sale product
                </a>
              </li>
              {Auth.isAuth && Auth.role === 0 && (
                <>
                  <li>
                    <a className="dropdown-item" href="#">
                      <GiMatterStates /> state orders
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <RiHeartAddLine /> Wishlist
                    </a>
                  </li>
                </>
              )}
              <li onClick={submitLogout}>
                <a className="dropdown-item" href="#">
                  <BiLogOutCircle /> logout
                </a>
              </li>
            </ul>
          </div>
        )}
        {/* start login */}
        {!Auth.isAuth && (
          <div className={Style.profileIcon + ' m-1'}>
            <Link href="/login">
              <a className="me-3">
                <AiOutlineLogin />
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

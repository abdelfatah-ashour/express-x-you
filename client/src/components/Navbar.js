import React, { useContext } from 'react';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { AuthStore } from '../context-api/Auth.context';

export default function Navbar() {
  const Path = useRouter().pathname;
  const { Auth } = useContext(AuthStore);

  return (
    <nav className="navbar navbar-expand-md px-3">
      <div className="container-fluid">
        <Link href="/">
          <a className="Brand">express x you</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">
            <FiMenu />
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link href="/">
                <a
                  className={Path === '/' ? 'nav-link activeNav' : 'nav-link'}
                  aria-current="Home Page">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services">
                <a
                  className={
                    Path === '/services' ? 'nav-link activeNav' : 'nav-link'
                  }
                  aria-current="Home Page">
                  services
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <a
                  className={
                    Path === '/about' ? 'nav-link activeNav' : 'nav-link'
                  }
                  aria-current="Home Page">
                  about us
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/FAQ">
                <a
                  className={
                    Path === '/FAQ' ? 'nav-link activeNav' : 'nav-link'
                  }
                  aria-current="Home Page">
                  faq
                </a>
              </Link>
            </li>

            {/* start order */}
            {Auth.isAuth && Auth.role === 0 && (
              <li className="nav-item">
                <Link href="/MyOrders">
                  <a
                    className={
                      Path === '/MyOrders' ? 'nav-link activeNav' : 'nav-link'
                    }
                    aria-current="Home Page">
                    my order
                  </a>
                </Link>
              </li>
            )}

            {/* start dashboard */}
            {Auth.role === 1 && (
              <li className="nav-item">
                <Link href="/admin/dashboard">
                  <a
                    className={
                      Path === '/admin/dashboard'
                        ? 'nav-link activeNav'
                        : 'nav-link'
                    }
                    aria-current="Home Page">
                    dashboard
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

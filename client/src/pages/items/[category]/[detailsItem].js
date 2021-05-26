import React, { useContext, useState } from 'react';
import Link from 'next/link';
import axios from '../../../utilities/axios';
import Layout from '../../../components/Layout';
import { API } from '../../../utilities/KEYS';
import Style from '../../../styles/DetailsItems.module.css';
import { AuthStore } from '../../../context-api/Auth.context';
import StepperCheckout from '../../../components/CheckoutStepper';
import Error from 'next/error';

export default function detailsItem({ product, error }) {
  const { Auth } = useContext(AuthStore);
  const [checked, setChecked] = useState(false);

  return (
    <Layout title={product.nameItem} description={product.description}>
      {product && (
        <div className={Style.mainDetails + ' container'}>
          <div className={Style.TopDetails + ' row'}>
            {!checked && (
              <>
                <div className="col-lg-4 col-md-6 col-12">
                  <img
                    src={`${API}/${product.imageItem}`}
                    alt={product.nameItem}
                    loading="lazy"
                    className={Style.Image}
                  />
                </div>
                <ul
                  className={
                    Style.listDetails +
                    ' col-lg-4 col-md-6 col-12 d-flex flex-column justify-content-center p-3'
                  }>
                  <li>
                    Name : <strong>{product.nameItem}</strong>
                  </li>
                  <li>
                    Brand : <strong>{product.brand}</strong>
                  </li>
                  <li>
                    Price : <strong>{product.price}</strong>$
                  </li>
                  <li>
                    Color :
                    <span
                      className={Style.Color}
                      style={{ backgroundColor: '#' + product.color }}></span>
                  </li>
                </ul>
              </>
            )}

            <div className={Style.Option + ' col-lg-4 col-md-6 col-12'}>
              {!checked && (
                <>
                  <button
                    className="btn btn-dark p-2 mb-3 mx-auto"
                    onClick={() => console.log('add to cart')}>
                    Add To Cart
                  </button>
                  <button
                    className="btn btn-warning p-2 mb-3 mx-auto"
                    onClick={() => setChecked(true)}>
                    checkout
                  </button>
                </>
              )}

              {!Auth.isAuth && checked && (
                <div className={Style.authenticateAlert}>
                  📛 Not Authorized !{'  '}
                  <Link href="/login">
                    <a aria-details="login">Login</a>
                  </Link>
                </div>
              )}

              {Auth.isAuth && checked && (
                <StepperCheckout
                  setChecked={setChecked}
                  items={[
                    { product: product._id, amount: product.price * 1, qty: 5 },
                  ]}
                  amount={product.price * 1}
                />
              )}
            </div>
          </div>

          {/* start table */}
          {!checked && (
            <div className="row justify-content-evenly">
              <div className="col-lg-9 col-md-6 col-sm-10 col-12">
                <table
                  className="table"
                  style={{
                    boxShadow: '0 0 .5rem var(--firstColor)',
                    padding: '.5rem',
                    borderRadius: '.5rem',
                  }}>
                  <thead>
                    <tr>
                      <th
                        scope="col-3"
                        style={{ borderRight: '1px solid  var(--firstColor)' }}>
                        TITLE
                      </th>
                      <th scope="col-9">DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{ borderRight: '1px solid  var(--firstColor)' }}>
                        Name
                      </td>
                      <td>{product.nameItem}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ borderRight: '1px solid  var(--firstColor)' }}>
                        Price
                      </td>
                      <td>
                        <strong>{product.price}</strong> $
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ borderRight: '1px solid  var(--firstColor)' }}>
                        Category
                      </td>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ borderRight: '1px solid  var(--firstColor)' }}>
                        Brand
                      </td>
                      <td>{product.brand}</td>
                    </tr>

                    {/* electronics */}
                    {product.section === 'mobiles' && (
                      <>
                        <tr>
                          <td
                            style={{
                              borderRight: '1px solid  var(--firstColor)',
                            }}>
                            ROM Memory
                          </td>
                          <td>{product.memory}</td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              borderRight: '1px solid  var(--firstColor)',
                            }}>
                            RAM Memory
                          </td>
                          <td>{product.ram}</td>
                        </tr>
                      </>
                    )}

                    {product.section === 'laptops' && (
                      <>
                        <tr>
                          <td
                            style={{
                              borderRight: '1px solid  var(--firstColor)',
                            }}>
                            display inch
                          </td>
                          <td>{product.inchLaptops}</td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              borderRight: '1px solid  var(--firstColor)',
                            }}>
                            size Of hard
                          </td>
                          <td>{product.hard}</td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              borderRight: '1px solid  var(--firstColor)',
                            }}>
                            RAM
                          </td>
                          <td>{product.ram}</td>
                        </tr>
                      </>
                    )}

                    {product.section === 'tv' && (
                      <>
                        <tr>
                          <td
                            style={{
                              borderRight: '1px solid  var(--firstColor)',
                            }}>
                            Display Inch
                          </td>
                          <td>{product.inchTv}</td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              borderRight: '1px solid  var(--firstColor)',
                            }}>
                            Display Type
                          </td>
                          <td>{product.typeDisplay}</td>
                        </tr>
                      </>
                    )}

                    {product.section === 'camera' && (
                      <>
                        <tr>
                          <td
                            style={{
                              borderRight: '1px solid  var(--firstColor)',
                            }}>
                            Effective Mega pixels with MP
                          </td>
                          <td>{product.effectiveMegapixels}</td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              borderRight: '1px solid  var(--firstColor)',
                            }}>
                            Video Capture Resolution
                          </td>
                          <td>{product.videoCaptureResolution}</td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td
                        style={{ borderRight: '1px solid  var(--firstColor)' }}>
                        Description
                      </td>
                      <td>{product.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      {error && <Error statusCode={500} title={'something went wrong!'} />}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  return await axios
    .get('/api/product/getOneProduct', {
      params: {
        productId: ctx.query.detailsItem,
      },
    })
    .then(({ data }) => {
      return {
        props: {
          product: data.message,
          error: null,
        },
      };
    })
    .catch(() => {
      return {
        props: {
          product: null,
          error: true,
        },
      };
    });
}

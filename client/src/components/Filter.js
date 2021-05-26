import React, { useEffect, useReducer, useState } from 'react';
import Style from '../styles/Filter.module.css';

import {
  colors,
  brandOfMobiles,
  sectionsOfElectronics,
} from '../components/create-item-components/create-item-data.json';
import { useRouter } from 'next/router';

export default function Filter() {
  const Router = useRouter();
  const queries = useRouter().query;

  const [filtering, setFiltering] = useState({
    page: queries.page || 1,
    section: queries.section || 'all',
    price: queries.price || 'all',
    color: queries.color || 'all',
    brand: queries.brand || 'all',
    date: queries.date || 'all',
  });

  function fixedFilter(state, action) {
    switch (action.type) {
      case 'FIXED':
        return (state = true);
      case 'BLOCK':
        return (state = false);
      default:
        return state;
    }
  }

  const [FIXED, dispatch] = useReducer(fixedFilter, false);

  const handleRangePrice = e => {
    setFiltering({
      ...filtering,
      [e.target.name]: e.target.value,
    });
    Router.push(
      `/items/${queries.category}?section=${
        queries.section ? queries.section : 'all'
      }&price=${e.target.value}&color=${filtering.color}&brand=${
        filtering.brand
      }&date=${filtering.date}`
    );
  };

  const handleChangeFilter = e => {
    setFiltering({
      ...filtering,
      [e.target.getAttribute('name')]: e.target.getAttribute('id'),
    });
    switch (e.target.getAttribute('name')) {
      case 'color':
        return Router.push(
          `/items/${queries.category}?section=${
            queries.section ? queries.section : 'all'
          }&price=${filtering.price}&color=${e.target.getAttribute(
            'id'
          )}&brand=${filtering.brand}&date=${filtering.date}`
        );
      case 'section':
        return Router.push(
          `/items/${queries.category}?section=${e.target.getAttribute(
            'id'
          )}&price=${filtering.price}&color=${filtering.color}&brand=${
            filtering.brand
          }&date=${filtering.date}`
        );

      case 'brand':
        return Router.push(
          `/items/${queries.category}?section=${
            queries.section ? queries.section : 'all'
          }&price=${filtering.price}&color=${
            filtering.color
          }&brand=${e.target.getAttribute('id')}&date=${filtering.date}`
        );
      case 'date':
        return Router.push(
          `/items/${queries.category}?section=${
            queries.section ? queries.section : 'all'
          }&price=${filtering.price}&color=${filtering.color}&brand=${
            filtering.brand
          }&date=${e.target.getAttribute('id')}`
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const filterRef = document.getElementById('filterRef');
    if (window !== undefined) {
      window.addEventListener('scroll', () => {
        if (window.scrollY - filterRef.scrollTop >= 250) {
          dispatch({ type: 'FIXED' });
        } else {
          dispatch({ type: 'BLOCK' });
        }
      });
    }
    return () => dispatch({ type: 'BLOCK' });
  }, []);

  return (
    <div
      className={
        FIXED
          ? Style.FIXED
          : Style.BLOCK +
            ' ' +
            Style.Filter +
            ' ' +
            ' row text-center justify-content-evenly align-items-center'
      }
      id="filterRef">
      {/* filter with section */}
      <div className="col-md-3 col-6 mx-auto">
        <div className="dropdown px-2">
          <button
            className="btn dropdown-toggle p-2"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Section
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <div className="row">
              <div
                className={
                  Style.brand + ' d-flex align-items-center col-md-6 col-12'
                }>
                <input
                  type="checkbox"
                  name="section"
                  className="mx-1"
                  id="all"
                  onChange={handleChangeFilter}
                  checked={filtering.section === 'all'}
                />
                <label className="mx-2" htmlFor="all">
                  ALL
                </label>
              </div>
              {sectionsOfElectronics.map((section, i) => {
                return (
                  <div
                    className={
                      Style.brand + ' d-flex align-items-center col-md-6 col-12'
                    }
                    key={i}>
                    <input
                      type="checkbox"
                      name="section"
                      className="mx-1"
                      id={section}
                      onChange={handleChangeFilter}
                      checked={filtering.section === section}
                    />
                    <label className="mx-2" htmlFor={section}>
                      {section}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* filter with price */}
      <div className="col-md-3 col-6 mx-auto">
        <div className="dropdown px-2">
          <button
            className="btn dropdown-toggle p-2"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            PRICE RANGE
          </button>
          <div
            className={Style.dropdownMenu + ' dropdown-menu'}
            aria-labelledby="dropdownMenuButton1">
            <label htmlFor="priceId" className="p-2">
              MIN: 100 - MAX:1000
            </label>
            <input
              className={Style.rangePrice}
              type="range"
              name="price"
              id="priceId"
              step="0.5"
              min="0"
              max="2000"
              onMouseUp={handleRangePrice}
            />
            min range : {filtering.price === 'all' ? '00' : filtering.price} $
          </div>
        </div>
      </div>

      {/* filter with color */}
      <div className="col-md-3 col-6 mx-auto">
        <div className="dropdown px-2">
          <button
            className="btn dropdown-toggle p-2"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            COLOR
          </button>
          <div
            className={Style.dropdownMenu + ' dropdown-menu'}
            aria-labelledby="dropdownMenuButton1">
            <div className="w-100 d-flex flex-wrap">
              <div
                className={Style.colorInput + ' text-center'}
                style={{ backgroundColor: '#fff' }}
                id="all"
                onMouseUp={handleChangeFilter}
                name="color">
                all
              </div>
              {colors.map((color, i) => {
                return (
                  <div
                    key={i}
                    className={Style.colorInput}
                    style={{ backgroundColor: '#' + color }}
                    id={color}
                    onMouseUp={handleChangeFilter}
                    name="color"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* filter with brand */}
      <div className="col-md-3 col-6 mx-auto">
        <div className={Style.dropdownMenu + ' dropdown'}>
          <button
            className="btn dropdown-toggle p-2"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            BRAND
          </button>
          <div
            className=" dropdown-menu p-2"
            aria-labelledby="dropdownMenuButton1">
            <div className="row">
              <div
                className={
                  Style.brand + ' d-flex align-items-center col-md-6 col-12'
                }>
                <input
                  type="checkbox"
                  name="brand"
                  className="mx-1"
                  id="all"
                  onChange={handleChangeFilter}
                  checked={filtering.brand === 'all'}
                />
                <label className="mx-2" htmlFor="all">
                  ALL
                </label>
              </div>
              {brandOfMobiles.map((brand, i) => {
                return (
                  <div
                    className={
                      Style.brand + ' d-flex align-items-center col-md-6 col-12'
                    }
                    key={i}>
                    <input
                      type="checkbox"
                      name="brand"
                      className="mx-1"
                      id={brand}
                      onChange={handleChangeFilter}
                      checked={filtering.brand === brand}
                    />
                    <label className="mx-2" htmlFor={brand}>
                      {brand}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* filter with size */}
      <div className="col-md-3 col-6 mx-auto">
        <div className={Style.dropdownMenu + ' dropdown'}>
          <button
            className="btn dropdown-toggle p-2"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Sort By
          </button>
          <div
            className="dropdown-menu p-2"
            aria-labelledby="dropdownMenuButton1">
            <div className="d-flex flex-wrap">
              {[
                { name: 'date', value: 'newest', label: 'newest' },
                { name: 'date', value: 'oldest', label: 'oldest' },
              ].map((date, i) => {
                return (
                  <div className="w-100" key={i}>
                    <input
                      className={Style.rangePrice}
                      type="checkbox"
                      name={date.name}
                      id={date.value}
                      onChange={handleChangeFilter}
                      checked={filtering.date === date.value}
                    />
                    <label htmlFor="true" className="p-2">
                      {date.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

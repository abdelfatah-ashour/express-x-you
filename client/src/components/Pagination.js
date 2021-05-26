import React from 'react';
import Style from '../styles/pagination.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Pagination({ length }) {
  const limitProducts = 25;
  const lengthPage = Math.ceil(length / limitProducts);
  const arrayPaginate = Array(lengthPage)
    .fill(null)
    .map((_, i) => i);

  const queries = useRouter().query;

  return (
    <>
      {arrayPaginate.length > 1 && (
        <div className={Style.pagination}>
          {arrayPaginate.map((paginate, i) => {
            const page = +queries.page;
            return (
              <Link
                key={i}
                href={`/items/${queries.category}?section=${
                  queries.section || 'all'
                }&page=${i + 1}&price=${queries.price || 'all'}&color=${
                  queries.color || 'all'
                }&brand=${queries.brand || 'all'}&date=${
                  queries.date || 'all'
                }`}>
                <a
                  aria-label="paginate new Page"
                  className={page === i + 1 ? 'btn btn-info' : 'btn btn-light'}
                  disabled={page === i + 1}>
                  {i + 1}
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

import React from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import Card from "../../../components/Card";
import axios from "../../../utilities/axios";
import Filter from "../../../components/Filter";
import Error from "next/error";
import Paginate from "../../../components/Pagination";

export default function index({ products, paginationLength, error }) {
  const { category } = useRouter().query;

  return (
    <Layout title={category && String(category).toUpperCase()}>
      {products && products.length > 0 && paginationLength && (
        <>
          <Filter />
          <div className="row mt-5 justify-content-evenly">
            {products.map((product, i) => {
              return <Card key={i} product={product} />;
            })}
          </div>
          <Paginate length={paginationLength} />
        </>
      )}
      {products && products.length === 0 && (
        <>
          <Filter />
          <div className="w-100 alert alert-success text-center mt-3">
            no product available
          </div>
        </>
      )}
      {error && (
        <>
          <Error statusCode={500} title={"Something Wrong"}></Error>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { category, section, page, brand, color, price, date } = ctx.query;

  return await axios
    .get(
      `/api/product?category=${category ? category : "all"}&section=${
        section ? section : "all"
      }&page=${page || "all"}&brand=${brand ? brand : "all"}&price=${
        price ? price : "all"
      }&color=${color ? color : "all"}&date=${
        date === "newest" ? "newest" : "oldest"
      }`
    )
    .then(({ data }) => {
      return {
        props: {
          products: data.message,
          paginationLength: data.pagination,
          error: null,
        },
      };
    })
    .catch(() => {
      return {
        props: {
          products: null,
          paginationLength: null,
          error: true,
        },
      };
    });
}

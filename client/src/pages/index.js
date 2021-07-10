import React from "react";
import Layout from "../components/Layout";
import CarousalHome from "../components/CarousalHome";
import TopTrend from "../components/TopTrend";
import HomeCategories from "../components/HomeCategories";
import Style from "../styles/Home.module.css";
import OurBrands from "../components/OurBrands";
import axios from "../utilities/axios";
import Error from "next/error";
export default function Home({ topTen, error }) {
  return (
    <>
      <Layout
        title="EXPRESS X YOU"
        description="Express x You is an ongoing design collaboration with our style community. Each season, we invite some of our best customers into the process. From helping us select prints and colors to wear testing new fits and fabrics, their input helps us design collections our customers will love.">
        <CarousalHome />
        {error && <Error title="Server Down" statusCode={500} />}

        {topTen && (
          <>
            <HomeCategories />
            <TopTrend topTrends={topTen} />
          </>
        )}
        {!error && (
          <>
            <div className={Style.ExpressDescription + " row"}>
              <div className={Style.containerImageExpress + " col-md-6 col-12"}>
                <img
                  src="/images/express.jpg"
                  alt="express shopping"
                  loading="lazy"
                  style={{ borderRadius: ".5rem" }}
                />
              </div>
              <div className="col-md-6 col-12 d-flex flex-column justify-content-center align-items-start">
                <h4 style={{ color: "inherit" }}>EXPRESS X YOU</h4>
                <p className="lead">
                  Express x You is an ongoing design collaboration with our
                  style community. Each season, we invite some of our best
                  customers into the process. From helping us select prints and
                  colors to wear testing new fits and fabrics, their input helps
                  us design collections our customers will love.
                </p>
              </div>
            </div>
            <OurBrands />
          </>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  return await axios
    .get("/api/product/getTopTen")
    .then(({ data }) => {
      return {
        props: {
          topTen: data.message,
          error: null,
        },
      };
    })
    .catch(() => {
      return {
        props: {
          topTen: null,
          error: "Error : something went wrong!",
        },
      };
    });
}

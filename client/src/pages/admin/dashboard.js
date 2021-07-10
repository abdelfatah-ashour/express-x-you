import React from "react";
import TableOfCP from "../../components/TableOfCP";
import Layout from "../../components/Layout";
import axios from "../../utilities/axios";
import Error from "next/error";
export default function controlPanel({ orders, error }) {
  return (
    <Layout title="Dashboard" description="dashboard for handle  all orders">
      <h6 className="text-center my-5 text-camelcase">all orders</h6>
      {orders && <TableOfCP orders={orders} />}
      {error && <Error statusCode={500} title={"something went wrong!"} />}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  if (!ctx.req.cookies.c_admin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return await axios
      .get("/api/admin/order", {
        headers: {
          admin: ctx.req.cookies.c_admin,
        },
      })
      .then(({ data }) => {
        return {
          props: {
            orders: data.message,
            error: null,
          },
        };
      })
      .catch(() => {
        return {
          props: {
            orders: null,
            error: true,
          },
        };
      });
  }
}

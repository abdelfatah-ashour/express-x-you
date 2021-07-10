import React from "react";
import Layout from "../components/Layout";

export default function about() {
  return (
    <Layout
      title="About Us"
      description="Its functioning style is
          quite similar to that of the physical retail industry.">
      <main>
        <h3>How does eCommerce work?</h3>
        <p className="lead pl-3">
          eCommerce is nothing but a type of commerce. Its functioning style is
          quite similar to that of the physical retail industry. The only
          difference it has with a brick and mortar store is that here, the
          entire process takes place online. The journey of an eCommerce firm
          begins with setting up an eCommerce website. It is usually done with
          plugins like WooCommerce. After that, the products are displayed along
          with necessary details like product descriptions and price tags. A CTA
          button like “Buy Now” is placed near the products for the convenience
          of the customers. If they feel like buying a product they can simply
          click on the button and make the payment. Customers are usually asked
          to place their orders by filling up a form. There, they need to
          provide all the necessary details like the delivery address. There are
          different payment methods used in the eCommerce industry. Buyers
          either can make the payment through a payment gateway like PayPal or
          they can use their credit cards. There is another option called COD or
          cash on delivery. This is mainly preferred by senior customers. In
          this option, the buyer makes the payment when the item they ordered is
          delivered on their personal address. The payment can be made either in
          cash or through cards or other convenient options like Google Pay. If
          you are not happy with the quality of the product or mistakenly a
          different product gets delivered to you, you can use the reverse
          logistics system. It is simply returning the items and getting the
          money back. You need to notify that you want to return the product you
          ordered. A representative of the company will come to you and take the
          product back. The money will be cashed to your account. The product
          promotion in eCommerce is also done digitally. The two most prominent
          methods are a digital advertising and email marketing. Ads are placed
          on the social media platforms which are most preferred by the target
          groups. All visitors are asked to provide their email addresses. Based
          on that an email list is prepared. After that personal emails are
          sent. Sometimes personal notifications are also sent to the social
          media accounts of the prospect costumes.
        </p>
        <br />
        <h3>How to build an E-Commerce website?</h3>
        <p className="lead">
          Selling products through an online shop is the best way to make a bit
          of extra money. Through an eCommerce website, you can easily introduce
          your products to a large number of customers at once. There are so
          many benefits of eCommerce websites over physical shops. And that is
          the reason why many traders are inclined to take their business to the
          next level by creating an eCommerce website. You don’t need to be a
          tech geek to build a website for your business. All you need is some
          knowledge of WordPress to use a WordPress theme compatible with
          WooCommerce. And then you can customize your eCommerce site in many
          ways. Alternatively, you can hire dedicated developers that will help
          you with your eCommerce website creation. Also, you can easily create
          your own eCommerce website with the help of various eCommerce
          platforms. Ecommerce platforms are the quickest way to build an
          eCommerce website. Below are some of the top eCommerce website
          builders which you can consider for developing your eCommerce website.
        </p>
        <h3>E-Commerce Website Legal Requirements</h3>
        <p className="lead">
          Before you even launch your e-commerce website, you need to make sure
          it is legally compliant with the data privacy laws that are applicable
          to your audience’s region. GDPR and CCPA are the two of the first
          regulations that directly impact data collection, use, and storage on
          a widespread scale. Below are some of the policies which you need to
          set up on your eCommerce website
        </p>
        <ol>
          <li>Privacy Policy</li>
          <li>Terms and Conditions</li>
          <li>
            Disclaimers ( related to your product, service, content or affiliate
            revenue)
          </li>
        </ol>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

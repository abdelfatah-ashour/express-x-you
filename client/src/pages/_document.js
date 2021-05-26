import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="shortcut icon"
            href="/express-shopping.png"
            sizes="128x128"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"></script>
          <script src="https://www.paypal.com/sdk/js?client-id=AT-0ZYYel-c5CGYqsOhX9a_NDWSCkGrO1p-qTeJ10IFp3fYaMH40sa55Cy50p9pbMCktTdf_190M_gmf"></script>
        </Head>
        <body>
          <noscript>
            you can not see any content please enable javascript files in
            application here
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

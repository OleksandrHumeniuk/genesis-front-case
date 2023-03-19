import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:wght@200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;

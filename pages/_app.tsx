import { AppProps } from "next/app";
import Head from "next/head";

import "~styles/app.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;

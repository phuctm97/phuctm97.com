import { AppProps } from "next/app";
import Head from "next/head";

import Header from "~layouts/header";
import Main from "~layouts/main";

import { MDXProvider } from "@mdx-js/react";
import * as MDXComponents from "components/mdx";

import "~styles/app.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <MDXProvider components={MDXComponents}>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
    </MDXProvider>
  </>
);

export default MyApp;

import { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import seoProps from "next-seo.config";
import { MDXProvider } from "@mdx-js/react";
import * as MDXComponents from "~components/mdx/Components";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <DefaultSeo {...seoProps} />
    <MDXProvider components={MDXComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  </>
);

export default MyApp;

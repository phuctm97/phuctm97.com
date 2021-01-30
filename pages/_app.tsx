import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

import Header from "~/layouts/header";
import Main from "~/layouts/main";
import Footer from "~/layouts/footer";

import { MDXProvider } from "@mdx-js/react";
import * as MDXComponents from "~/components/mdx";

import PlausibleScript from "~/components/plausible-script";
import { IS_PRODUCTION } from "~/constants/share";

import "~/styles/base.css";
import "~/styles/components.css";
import "~/styles/utilities.css";
import "~/styles/prism.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <ThemeProvider attribute="class" enableSystem={false}>
      <MDXProvider components={MDXComponents}>
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </MDXProvider>
    </ThemeProvider>
    {IS_PRODUCTION && <PlausibleScript />}
  </>
);

export default MyApp;

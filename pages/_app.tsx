import { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import PlausibleScript from "~/components/plausible-script";

import Header from "~/layouts/header";
import Main from "~/layouts/main";
import Footer from "~/layouts/footer";

import { MDXProvider } from "@mdx-js/react";
import * as MDXComponents from "components/mdx";

import PKG_JSON from "~/package.json";
import { IS_PRODUCTION } from "~/utils/const/common";

import "~/styles/app.css";
import "~/styles/prism.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <DefaultSeo
      {...PKG_JSON.site}
      canonical={PKG_JSON.homepage}
      description={PKG_JSON.description}
      openGraph={{
        ...PKG_JSON.site.openGraph,
        url: PKG_JSON.homepage,
        title: PKG_JSON.site.title,
        description: PKG_JSON.description,
        images: PKG_JSON.site.openGraph.images.map((img) => ({
          ...img,
          url: `${PKG_JSON.homepage}${img.url}`,
          alt: PKG_JSON.site.title,
        })),
      }}
    />
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

import { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import Header from "~/layouts/header";
import Main from "~/layouts/main";
import Footer from "~/layouts/footer";

import { MDXProvider } from "@mdx-js/react";
import * as MDXComponents from "~/components/mdx";

import PlausibleScript from "~/components/plausible-script";
import { PKG, IS_PRODUCTION } from "~/constants/common";

import "~/styles/app.css";
import "~/styles/prism.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <DefaultSeo
      {...PKG.site}
      canonical={PKG.homepage}
      description={PKG.description}
      openGraph={{
        ...PKG.site.openGraph,
        url: PKG.homepage,
        title: PKG.site.title,
        description: PKG.description,
        images: PKG.site.openGraph.images.map((img) => ({
          ...img,
          url: `${PKG.homepage}${img.url}`,
          alt: PKG.site.title,
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

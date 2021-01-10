import { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import PlausibleScript from "~/components/plausible-script";
import { isProd } from "~/utils/env";

import Header from "~/layouts/header";
import Main from "~/layouts/main";
import Footer from "~/layouts/footer";

import { MDXProvider } from "@mdx-js/react";
import * as MDXComponents from "components/mdx";

import packageJSON from "~/package.json";
import "~/styles/app.css";
import "~/styles/prism.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <DefaultSeo
      {...packageJSON.site}
      canonical={packageJSON.homepage}
      description={packageJSON.description}
      openGraph={{
        ...packageJSON.site.openGraph,
        url: packageJSON.homepage,
        title: packageJSON.site.title,
        description: packageJSON.description,
        images: packageJSON.site.openGraph.images.map((img) => ({
          ...img,
          url: `${packageJSON.homepage}${img.url}`,
          alt: packageJSON.site.title,
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
    {isProd && <PlausibleScript />}
  </>
);

export default MyApp;

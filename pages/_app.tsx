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
import { PKG, ME, IS_PRODUCTION } from "~/constants/share";

import "~/styles/app.css";
import "~/styles/prism.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <DefaultSeo
      title={PKG.site.title}
      description={PKG.description}
      canonical={PKG.homepage}
      openGraph={{
        title: PKG.site.title,
        description: PKG.description,
        url: PKG.homepage,
        type: PKG.site.openGraph.type,
        locale: PKG.site.openGraph.locale,
        images: [
          {
            ...PKG.site.openGraph.image,
            url: `${PKG.homepage}${PKG.site.openGraph.image.url}`,
            alt: PKG.site.title,
          },
        ],
        defaultImageWidth: PKG.site.openGraph.image.width,
        defaultImageHeight: PKG.site.openGraph.image.height,
      }}
      twitter={{
        site: `@${ME.username}`,
        handle: `@${ME.username}`,
        cardType: PKG.site.twitter.card,
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

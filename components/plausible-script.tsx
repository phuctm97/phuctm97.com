import Head from "next/head";
import PKG_JSON from "~/package.json";

const HOMEPAGE = new URL(PKG_JSON.homepage);

const PlausibleScript = () => {
  return (
    <Head>
      <script
        key="plausible-script"
        async
        defer
        data-domain={HOMEPAGE.host}
        src={PKG_JSON.plausible.scriptURL}
      />
    </Head>
  );
};

export default PlausibleScript;

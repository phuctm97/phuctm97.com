import Head from "next/head";
import PKG_JSON from "~/package.json";

const HOME_PAGE = new URL(PKG_JSON.homepage);

const PlausibleScript = () => {
  return (
    <Head>
      <script
        key="plausible-script"
        async
        defer
        src={PKG_JSON.plausible.scriptURL}
        data-domain={HOME_PAGE.host}
      />
    </Head>
  );
};

export default PlausibleScript;

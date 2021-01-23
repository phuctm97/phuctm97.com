import Head from "next/head";
import { PKG_JSON, HOMEPAGE } from "~/constants/shared";

const PlausibleScript = () => {
  return (
    <Head>
      <script
        key="plausible-script"
        src={PKG_JSON.plausible.scriptURL}
        async
        defer
        data-domain={HOMEPAGE.host}
      />
    </Head>
  );
};

export default PlausibleScript;

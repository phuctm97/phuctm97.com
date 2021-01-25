import Head from "next/head";
import { PKG } from "~/constants/share";

const PlausibleScript = () => {
  return (
    <Head>
      <script
        key="plausible-script"
        src={PKG.site.plausible.scriptURL}
        async
        defer
        data-domain={new URL(PKG.homepage).host}
      />
    </Head>
  );
};

export default PlausibleScript;

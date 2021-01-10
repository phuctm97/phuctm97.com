import Head from "next/head";
import packageJSON from "~/package.json";

const projectURL = new URL(packageJSON.homepage);

const PlausibleScript = () => {
  return (
    <Head>
      <script
        key="plausible-script"
        async
        defer
        data-domain={projectURL.host}
        src={packageJSON.plausible.scriptURL}
      />
    </Head>
  );
};

export default PlausibleScript;

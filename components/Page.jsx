import Head from "next/head";

const Page = ({ title, description, children }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    {children}
  </>
);

export default Page;

import Head from "next/head";

type Props = React.PropsWithChildren<{
  title: string;
  description: string;
}>;

const Page = ({ title, description, children }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@phuctm97" />
    </Head>
    {children}
  </>
);

export default Page;

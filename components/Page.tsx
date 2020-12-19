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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/images/twitter-card.png" />
      <meta name="twitter:image:alt" content="Minh-Phuc Tran @phuctm97" />
      <meta name="twitter:creator:id" content="1163045996755951619" />
    </Head>
    {children}
  </>
);

export default Page;

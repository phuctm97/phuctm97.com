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
    </Head>
    {children}
  </>
);

export default Page;

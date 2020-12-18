import Head from "next/head";

type Props = React.PropsWithChildren<{
  title: string;
  description: string;
}>;

const Post = ({ title, description, children }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <article>
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
    </article>
  </>
);

export default Post;

import Head from "next/head";

type Props = React.PropsWithChildren<{
  title: string;
  description: string;
  createdAt: Date;
}>;

const Post = ({ title, description, createdAt, children }: Props) => (
  <>
    <Head>
      <title>{title} · Minh-Phuc Tran</title>
      <meta name="description" content={description} />
    </Head>
    <article>
      <header>
        <h1>{title}</h1>
        <sup>
          <em>{createdAt.toLocaleDateString()}</em>
        </sup>
      </header>
      <main>{children}</main>
    </article>
  </>
);

export default Post;

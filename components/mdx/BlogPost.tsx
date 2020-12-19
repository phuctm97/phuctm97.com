import Head from "next/head";

type Props = {
  title: string;
  description: string;
  publishedAt: Date;
};

const BlogPost: React.FC<Props> = ({
  title,
  description,
  publishedAt,
  children,
}) => (
  <>
    <Head>
      <title>{title} · Minh-Phuc Tran</title>
      <meta name="description" content={description} />
    </Head>
    <article>
      <header>
        <h1>{title}</h1>
        <sup>
          <em>{publishedAt.toLocaleDateString()}</em>
        </sup>
      </header>
      <main>{children}</main>
    </article>
  </>
);

const createBlogPost = (props: Props): React.FC => ({ children }) => (
  <BlogPost {...props}>{children}</BlogPost>
);

export default createBlogPost;

import { NextSeo } from "next-seo";
import seoProps from "next-seo.config";

type Props = {
  path: string;
  title: string;
  description: string;
  publishedTime: Date;
};

const BlogPost: React.FC<Props> = ({
  path,
  title,
  description,
  publishedTime,
  children,
}) => (
  <>
    <NextSeo
      title={`${title} | Minh-Phuc Tran`}
      description={description}
      canonical={`${seoProps.canonical}/${path}`}
      openGraph={{
        type: "article",
        url: `${seoProps.canonical}/${path}`,
        article: { publishedTime: publishedTime.toISOString() },
        title,
        description,
      }}
    />
    <article>
      <header>
        <h1>{title}</h1>
        <sup>
          <em>{publishedTime.toLocaleDateString()}</em>
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

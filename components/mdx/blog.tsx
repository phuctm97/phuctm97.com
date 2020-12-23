import { NextSeo } from "next-seo";

type Props = {
  url: string;
  title: string;
  description: string;
  tags: string[];
  publishedTime: Date;
};

const BlogPost: React.FC<Props> = ({
  url,
  title,
  description,
  tags,
  publishedTime,
  children,
}) => (
  <>
    <NextSeo
      title={`${title} | Minh-Phuc Tran`}
      description={description}
      canonical={url}
      openGraph={{
        type: "article",
        url,
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
          {tags.length > 0 && (
            <p>
              Tags:{" "}
              {tags.map((tag, index) => (
                <span key={index}>
                  <code>{tag}</code>{" "}
                </span>
              ))}
            </p>
          )}
        </sup>
      </header>
      <main>{children}</main>
    </article>
  </>
);

const layoutBlogPost = (props: Props): React.FC => ({ children }) => (
  <BlogPost {...props}>{children}</BlogPost>
);

export default layoutBlogPost;

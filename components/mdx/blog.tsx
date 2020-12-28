import { NextSeo } from "next-seo";
import Header from "~components/header";
import Main from "~components/main";
import styles from "./blog.module.scss";

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
    <Header />
    <Main>
      <article className={styles.post}>
        <header>
          <h1>{title}</h1>
          <sup>
            <em>{publishedTime.toLocaleDateString()}</em>
          </sup>
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
        </header>
        <main>{children}</main>
      </article>
    </Main>
  </>
);

const layoutBlogPost = (props: Props): React.FC => ({ children }) => (
  <BlogPost {...props}>{children}</BlogPost>
);

export default layoutBlogPost;

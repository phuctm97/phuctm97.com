import { NextSeo } from "next-seo";
import Header from "~components/header";
import Footer from "~components/footer";
import styles from "./blog.module.css";

type Props = {
  url: string;
  title: string;
  description: string;
  tags: string[];
  coverURL: string;
  publishedTime: Date;
};

const BlogPost: React.FC<Props> = ({
  url,
  title,
  description,
  tags,
  publishedTime,
  coverURL,
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
        images: [{ url: coverURL, alt: title }],
      }}
    />
    <Header />
    <main className="container max-w-2xl mx-auto px-4 md:px-0">
      <article className="prose">
        <h1 id={styles.title}>{title}</h1>
        <p id={styles.info}>
          By{" "}
          <strong>
            <a href="https://twitter.com/phuctm97">Minh-Phuc Tran</a>
          </strong>{" "}
          -{" "}
          {publishedTime.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        {tags.length > 0 && (
          <div id={styles.tags}>
            {tags.map((tag, index) => (
              <p key={index}>{tag}</p>
            ))}
          </div>
        )}
        {children}
      </article>
    </main>
    <Footer />
  </>
);

const layoutBlogPost = (props: Props): React.FC => ({ children }) => (
  <BlogPost {...props}>{children}</BlogPost>
);

export default layoutBlogPost;

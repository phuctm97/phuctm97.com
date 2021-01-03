import { NextSeo } from "next-seo";
import Header from "~components/header";
import Footer from "~components/footer";
import Prose from "~components/prose";

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
    <Prose>
      <h1>{title}</h1>
      {children}
    </Prose>
    <Footer />
  </>
);

const layoutBlogPost = (props: Props): React.FC => ({ children }) => (
  <BlogPost {...props}>{children}</BlogPost>
);

export default layoutBlogPost;

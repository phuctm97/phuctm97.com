import { NextSeo } from "next-seo";
import Header from "~layouts/header";
import Main from "~layouts/main";
import Prose from "~layouts/prose";
import Footer from "~layouts/footer";

type Props = {
  url: string;
  title: string;
  description: string;
  tags: string[];
  coverURL: string;
  publishedTime: Date;
};

const BlogPostLayout: React.FC<Props> = ({
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
    <Main>
      <Prose>
        <h1>{title}</h1>
        {children}
      </Prose>
    </Main>
    <Footer />
  </>
);

export default BlogPostLayout;

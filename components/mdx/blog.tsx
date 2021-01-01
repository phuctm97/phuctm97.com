import { NextSeo } from "next-seo";
import Header from "~components/header";

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
    <main>
      <article>
        <header className="mb-6">
          <h1 className="text-5xl font-bold mb-6 p-0">{title}</h1>
          <p className="font-light mb-2 text-gray-600">
            By{" "}
            <strong className="font-medium">
              <a
                className="text-gray-900 hover:text-black"
                href="https://twitter.com/phuctm97"
              >
                Minh-Phuc Tran
              </a>
            </strong>{" "}
            -{" "}
            {publishedTime.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-row">
              {tags.map((tag, index) => (
                <p
                  className="py-1 px-2 rounded-sm mt-0 mr-1 bg-gray-100 text-gray-800"
                  key={index}
                >
                  {tag}
                </p>
              ))}
            </div>
          )}
        </header>
        {children}
      </article>
    </main>
  </>
);

const layoutBlogPost = (props: Props): React.FC => ({ children }) => (
  <BlogPost {...props}>{children}</BlogPost>
);

export default layoutBlogPost;

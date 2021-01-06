import { NextSeo } from "next-seo";
import Link from "next/link";
import { Post } from "~lib/post";
import packageJSON from "~package.json";

const Wrapper: React.FC<{ post: Post }> = ({ post, children }) => {
  const title = `${post.title} | ${packageJSON.author.name}`;
  const url = `${packageJSON.homepage}${post.path}`;
  const { description } = post;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: "article",
          title,
          url,
          description,
          article: {
            publishedTime: new Date(post.date).toISOString(),
            authors: [packageJSON.author.url],
            tags: post.tags,
          },
          images: [{ ...post.cover, alt: title }],
        }}
      />
      <article className="prose prose-sm sm:prose md:prose-md dark:prose-dark">
        {children}
      </article>
    </>
  );
};

const Anchor = ({ href, ...htmlAttrs }: React.HTMLProps<HTMLAnchorElement>) =>
  href ? (
    <Link href={href}>
      <a {...htmlAttrs} />
    </Link>
  ) : (
    <a {...htmlAttrs} />
  );

export { Wrapper as wrapper, Anchor as a };

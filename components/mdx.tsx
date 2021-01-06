import { Children } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Info from "~components/info";
import { Post } from "~lib/post";
import packageJSON from "~package.json";

const Wrapper: React.FC<{ post: Post }> = ({ post, children }) => {
  const title = `${post.title} | ${packageJSON.author.name}`;
  const url = `${packageJSON.homepage}${post.path}`;
  const date = new Date(post.date);
  const { description } = post;

  const [h1, ...content] = Children.toArray(children);
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
            publishedTime: date.toISOString(),
            authors: [packageJSON.author.url],
            tags: post.tags,
          },
          images: [{ ...post.cover, alt: title }],
        }}
      />
      <article className="prose prose-sm sm:prose md:prose-md dark:prose-dark">
        {h1}
        <Info
          author={{
            name: packageJSON.author.name,
            url: `https://twitter.com/${packageJSON.site.twitter.handle}`,
            avatarURL: "/static/avatar.jpg",
          }}
          date={date}
        />
        {content}
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

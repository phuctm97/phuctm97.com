import { Children } from "react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Info from "~components/info";
import Tags from "~components/tags";
import { Post } from "~lib/post";
import packageJSON from "~package.json";

const { homepage } = packageJSON;
const me = {
  ...packageJSON.author,
  avatarURL: "/static/avatar.jpg",
  twitter: packageJSON.site.twitter.handle.substr(1),
};

const Wrapper: React.FC<{ post: Post }> = ({ post, children }) => {
  const { description, tags, path } = post;
  const title = `${post.title} | ${me.name}`;
  const url = `${homepage}${path}`;
  const date = new Date(post.date);

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
            authors: [me.url],
            tags: tags,
          },
          images: [{ ...post.cover, alt: title }],
        }}
      />
      <article className="prose prose-sm sm:prose md:prose-md dark:prose-dark">
        {h1}
        <Info
          author={{ ...me, url: `https://twitter.com/${me.twitter}` }}
          date={date}
        />
        <Tags tags={tags} />
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

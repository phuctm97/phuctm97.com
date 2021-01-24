import { Children } from "react";
import { NextSeo } from "next-seo";
import Published from "~/components/published";
import Tags from "~/components/tags";
import Subscribe from "~/components/subscribe";
import { Post } from "@/next-blog/interfaces";
import PKG_JSON from "~/package.json";

const { homepage } = PKG_JSON;
const me = {
  ...PKG_JSON.author,
  avatarURL: "/static/avatar.jpg",
  twitter: PKG_JSON.site.twitter.handle.substr(1),
};

type Props = React.PropsWithChildren<{
  metadata: Post;
}>;

const BlogLayout = ({ metadata, children }: Props) => {
  const { description, tags, path } = metadata;
  const title = `${metadata.title} | ${me.name}`;
  const url = `${homepage}${path}`;
  const date = new Date(metadata.date);

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
          images: [{ ...metadata.cover, alt: title }],
        }}
      />
      <article className="prose prose-sm mx-auto sm:prose md:prose-md dark:prose-dark">
        {h1}
        <Published
          author={{ ...me, url: `https://twitter.com/${me.twitter}` }}
          date={date}
        />
        <Tags tags={tags} />
        {content}
      </article>
      <Subscribe className="mt-14 md:mt-16" />
    </>
  );
};

export default BlogLayout;

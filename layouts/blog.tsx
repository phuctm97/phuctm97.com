import { Children } from "react";
import { NextSeo } from "next-seo";
import Published from "~/components/published";
import Tags from "~/components/tags";
import Subscribe from "~/components/subscribe";
import { HOMEPAGE, ME } from "~/constants/shared";
import { Post } from "@/next-blog/interfaces"; // TODO: Remove this.

type Props = React.PropsWithChildren<{
  metadata: Post;
}>;

const BlogLayout = ({ metadata, children }: Props) => {
  const { description, tags, path } = metadata;
  const title = `${metadata.title} | ${ME.name}`;
  const url = `${HOMEPAGE}${path.substr(1)}`;
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
          description,
          url,
          article: {
            publishedTime: date.toISOString(),
            authors: [ME.url],
            tags,
          },
          images: [{ ...metadata.cover, alt: title }],
        }}
      />
      <article className="prose prose-sm mx-auto sm:prose md:prose-md dark:prose-dark">
        {h1}
        <Published
          author={{ ...ME, url: `https://twitter.com/${ME.username}` }}
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

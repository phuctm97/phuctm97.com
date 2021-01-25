import { Children } from "react";
import { NextSeo } from "next-seo";
import { BlogPost } from "~/interfaces/content";
import Published from "~/components/published";
import Tags from "~/components/tags";
import Subscribe from "~/components/subscribe";
import { PKG, ME } from "~/constants/share";

const BlogLayout = ({
  children,
  ...props
}: React.PropsWithChildren<BlogPost>) => {
  const { title, description, tags, cover, url } = props;
  const date = new Date(props.date);

  const [h1, ...contents] = Children.toArray(children);
  return (
    <>
      <NextSeo
        title={`${title} | ${ME.name}`}
        description={description}
        canonical={url}
        openGraph={{
          type: "article",
          title: `${title} | ${ME.name}`,
          description,
          url,
          article: {
            publishedTime: date.toISOString(),
            authors: [ME.url],
            tags,
          },
          images: [
            {
              ...PKG.site.openGraph.image,
              alt: `${title} | ${ME.name}`,
              ...cover,
            },
          ],
        }}
      />
      <article className="prose prose-sm mx-auto sm:prose md:prose-md dark:prose-dark">
        {h1}
        <Published
          author={{ ...ME, url: `https://twitter.com/${ME.username}` }}
          date={date}
        />
        {tags && <Tags tags={tags} />}
        {contents}
      </article>
      <Subscribe className="mt-14 md:mt-16" />
    </>
  );
};

export default BlogLayout;

import { Children } from "react";
import { BlogPost } from "~/interfaces/content";
import SEO from "~/components/seo";
import Published from "~/components/published";
import Tags from "~/components/tags";
import Subscribe from "~/components/subscribe";
import { ME } from "~/constants/share";

const BlogLayout = (props: React.PropsWithChildren<BlogPost>) => {
  const { title, description, tags, cover } = props;
  const date = new Date(props.date);

  const [h1, ...contents] = Children.toArray(props.children);
  return (
    <>
      <SEO
        title={title}
        description={description}
        type="article"
        image={cover}
        article={{
          publishedTime: date.toISOString(),
          authors: [ME.url],
          tags,
        }}
      />
      <article className="prose prose-sm mx-auto sm:prose md:prose-md dark:prose-dark">
        {h1}
        <Published
          author={{ ...ME, url: `https://twitter.com/${ME.username}` }}
          date={date}
        />
        {tags && <Tags className="mt-2 sm:mt-3 mb-8 md:mb-10" tags={tags} />}
        {contents}
      </article>
      <Subscribe className="mt-14 md:mt-16" />
    </>
  );
};

export default BlogLayout;

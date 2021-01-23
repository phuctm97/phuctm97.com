import { NextSeo } from "next-seo";
import { BlogPost } from "~/interfaces/content";
import Info from "~/components/info";
import Tags from "~/components/tags";
import Subscribe from "~/components/subscribe";
import { PKG } from "~/constants/common";

const me = {
  ...PKG.author,
  avatarURL: "/static/avatar.jpg",
  twitterURL: `https://twitter.com/${PKG.site.twitter.handle.substr(1)}`,
};

const BlogLayout = ({
  children,
  ...props
}: React.PropsWithChildren<BlogPost>) => {
  const title = `${props.title} | ${me.name}`;
  const date = new Date(props.date);
  const { description, url, tags, cover } = props;
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
            authors: [me.url],
            tags: tags,
          },
          images: [{ ...cover, alt: props.title }],
        }}
      />
      <article className="prose prose-sm mx-auto sm:prose md:prose-md dark:prose-dark">
        <h1>{props.title}</h1>
        <Info author={{ ...me, url: me.twitterURL }} date={date} />
        <Tags tags={tags} />
        {children}
      </article>
      <Subscribe className="mt-14 md:mt-16" />
    </>
  );
};

export default BlogLayout;

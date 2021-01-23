import { NextSeo } from "next-seo";
import { BlogPost } from "~/interfaces/content";
import Info from "~/components/info";
import Tags from "~/components/tags";
import Subscribe from "~/components/subscribe";
import { PKG_JSON } from "~/constants/shared";

const me = {
  ...PKG_JSON.author,
  avatarURL: "/static/avatar.jpg",
  twitter: PKG_JSON.site.twitter.handle.substr(1),
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
          images: [{ ...cover, alt: title }],
        }}
      />
      <article className="prose prose-sm mx-auto sm:prose md:prose-md dark:prose-dark">
        <h1>{title}</h1>
        <Info
          author={{ ...me, url: `https://twitter.com/${me.twitter}` }}
          date={date}
        />
        <Tags tags={tags} />
        {children}
      </article>
      <Subscribe className="mt-14 md:mt-16" />
    </>
  );
};

export default BlogLayout;

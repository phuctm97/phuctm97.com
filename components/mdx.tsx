import Link from "next/link";
import { NextSeo } from "next-seo";
import { Content } from "~/interfaces/content";

const Wrapper = ({ children, ...props }: React.PropsWithChildren<Content>) => {
  const { title, description, url } = props;
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
        }}
      />
      <article className="prose prose-sm mx-auto sm:prose md:prose-md dark:prose-dark">
        <h1>{title}</h1>
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

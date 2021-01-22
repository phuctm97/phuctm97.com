import Link from "next/link";
import { NextSeo } from "next-seo";
import { Content } from "~/models/content";

const Wrapper = ({ metadata, children }: React.PropsWithChildren<Content>) => {
  const { title, description, url } = metadata;
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

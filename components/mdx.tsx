import Link from "next/link";
import { NextSeo } from "next-seo";
import { Content } from "~/interfaces/content";
import { ME } from "~/constants/share";

const Wrapper = ({ children, ...props }: React.PropsWithChildren<Content>) => {
  const { title, description, url } = props;
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
export { default as pre } from "~/components/code-block";

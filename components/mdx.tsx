import Link from "next/link";

const Wrapper = ({ children }: React.PropsWithChildren<{}>) => (
  <article className="prose prose-sm mx-auto sm:prose md:prose-md dark:prose-dark">
    {children}
  </article>
);

const Anchor = ({ href, ...htmlAttrs }: React.HTMLProps<HTMLAnchorElement>) =>
  href ? (
    <Link href={href}>
      <a {...htmlAttrs} />
    </Link>
  ) : (
    <a {...htmlAttrs} />
  );

export { Wrapper as wrapper, Anchor as a };

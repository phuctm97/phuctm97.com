import Link from "next/link";

const Wrapper: React.FC = ({ children }) => (
  <article className="prose prose-sm sm:prose dark:prose-dark">
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

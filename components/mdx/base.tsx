import NextLink from "next/link";
import Header from "~components/header";

const Wrapper: React.FC = ({ children }) => (
  <>
    <Header />
    <main className="container-custom mx-auto">
      <article className="prose prose-sm pt-4 pb-10 mx-auto md:prose md:pt-6 md:pb-12 lg:prose-lg lg:pt-8 lg:pb-16 xl:prose-xl 2xl:prose-2xl">
        {children}
      </article>
    </main>
  </>
);

const Link = ({ href, ...props }: React.ComponentProps<"a">) => {
  if (!href) return <a {...props} />;
  return <NextLink href={href} {...props} />;
};

export { Wrapper as wrapper, Link as a };

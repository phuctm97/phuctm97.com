import Link from "next/link";
import Header from "~components/header";

export const wrapper: React.FC = ({ children }) => (
  <>
    <Header />
    <main className="container-custom mx-auto">
      <article className="prose mx-auto prose-sm md:prose lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        {children}
      </article>
    </main>
  </>
);

export const a = ({ href, ...props }: React.ComponentProps<"a">) => (
  <Link href={href ?? "#"} {...props} />
);

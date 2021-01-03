import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

const Prose = ({ children }: Props) => (
  <main className="container-custom mx-auto">
    <article className="prose prose-sm pt-4 pb-10 mx-auto md:prose md:pt-6 md:pb-12 lg:prose-lg lg:pt-8 lg:pb-16 xl:prose-xl 2xl:prose-2xl">
      {children}
    </article>
  </main>
);

export default Prose;

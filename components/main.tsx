import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

const Main = ({ children }: Props) => (
  <main className="container max-w-2xl mx-auto px-4 mt-10 mb-14 lg:px-0">
    {children}
  </main>
);

export default Main;

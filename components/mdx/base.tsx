import Route from "next/link";
import Header from "~components/header";
import Footer from "~components/footer";
import Prose from "~components/prose";

const Wrapper: React.FC = ({ children }) => (
  <>
    <Header />
    <Prose>{children}</Prose>
    <Footer />
  </>
);

const Link = ({ href, ...props }: React.ComponentProps<"a">) => (
  <Route href={href || "#"} {...props} />
);

export { Wrapper as wrapper, Link as a };

import Route from "next/link";
import Prose from "~components/prose";

const Wrapper: React.FC = ({ children }) => <Prose>{children}</Prose>;

const Link = ({ href, ...props }: React.ComponentProps<"a">) => (
  <Route href={href || "#"} {...props} />
);

export { Wrapper as wrapper, Link as a };

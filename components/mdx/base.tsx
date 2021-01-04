import Route from "next/link";
import MDXLayout from "~layouts/mdx";

const Link = ({ href, ...props }: React.ComponentProps<"a">) => (
  <Route href={href || "#"} {...props} />
);

export { MDXLayout as wrapper, Link as a };

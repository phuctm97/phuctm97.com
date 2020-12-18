import Link from "next/link";

export const a = ({ href, ...props }: React.ComponentProps<"a">) => (
  <Link href={href ?? "#"} {...props} />
);

import glob from "glob";
import vfile from "to-vfile";

import { reader } from "@/mdx-with-frontmatter";
import notNil from "~/utils/lang/not-nil";
import { HasPost, Post } from "@/next-blog/interfaces";
import parser from "@/next-blog/unified-parser";
import { BLOG_DIR } from "@/next-blog/constants";

const readOne = (absPath: string): Post | undefined => {
  const file = reader().use(parser).processSync(vfile.readSync(absPath));
  const { post } = file.data as Partial<HasPost>;
  return post;
};

/**
 * Reads all blog posts in chronological order.
 */
export default function readAllBlog(): Post[] {
  return glob
    .sync("**/*.mdx", {
      cwd: BLOG_DIR,
      absolute: true,
    })
    .map(readOne)
    .filter(notNil)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

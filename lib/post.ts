import path from "path";
import glob from "glob";
import { Plugin } from "unified";
import vfile from "to-vfile";

import isParent from "@/unist-is-parent";
import { reader } from "@/mdx-with-frontmatter";
import { HasPost, Post } from "@/next-blog/interfaces";
import parser from "@/next-blog/unified-parser";
import { PAGES_DIR } from "@/next-constants";

const BLOG_DIR = path.join(PAGES_DIR, "blog");

/**
 * A unified/remark plugin that exports `post` from a _parsed_ MDX blog post for dynamic rendering (if applicable).
 */
export const postExporter: Plugin = () => (tree, file) => {
  const { post } = file.data as Partial<HasPost>;
  if (!post) return file.message("Not a post, skip.");

  if (!isParent(tree)) return file.fail("Tree is empty.");
  tree.children.push({
    type: "export",
    value: `export const post = ${JSON.stringify(post)};`,
  });
};

/**
 * Reads a blog post from a file.
 * @param absPath Absolute path to the blog post's file
 */
export const readPost = (absPath: string): Post | undefined => {
  const file = reader().use(parser).processSync(vfile.readSync(absPath));
  const { post } = file.data as Partial<HasPost>;
  return post;
};

/**
 * Lists all blog posts' filenames (absolute paths).
 */
export const getBlogFiles = () =>
  glob.sync("**/*.mdx", {
    cwd: BLOG_DIR,
    absolute: true,
  });

/**
 * Checks if a post is not nil (`null` or `undefined`).
 * @param val A nullable blog post
 */
export const postIsntNil = (val: Post | undefined | null): val is Post => !!val;

/**
 * Reads all blog posts in chronological order.
 */
export const readBlog = (): Post[] =>
  getBlogFiles()
    .map(readPost)
    .filter(postIsntNil)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

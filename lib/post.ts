import path from "path";
import glob from "glob";
import { Plugin } from "unified";
import { select } from "unist-util-select";
import mdToString from "mdast-util-to-string";
import vfile from "to-vfile";

import isParent from "@/unist-is-parent";
import { HasFrontmatter, reader } from "@/mdx-with-frontmatter";
import { HasPost, Post } from "@/next-blog/interfaces";
import isPost from "@/next-blog/is-post";
import getURLElements from "@/next-blog/get-url";
import validateFrontmatter from "@/next-blog/validate-frontmatter";
import generateCover from "@/next-blog/generate-cover";
import { PAGES_DIR } from "@/next-constants";

const BLOG_DIR = path.join(PAGES_DIR, "blog");

/**
 * A unified/remark plugin that parses and extracts a blog post's metadata from its file (if applicable).
 */
export const postParser: Plugin = () => (tree, file) => {
  if (!file.path) return file.fail("Unknown file path.");
  if (!isPost(file.path)) return file.message("Not a post, skip.");

  const { path: relURL, folder, slug } = getURLElements(file.path);

  const data = file.data as Partial<HasFrontmatter & HasPost>;

  const { frontmatter } = data;
  if (!frontmatter) return file.fail("No frontmatter.");

  validateFrontmatter(frontmatter);

  let title: string;
  let description: string;

  // Find title in frontmatter.title -> first h1.
  if (frontmatter.title) {
    title = frontmatter.title;
  } else {
    const h1 = select("heading[depth=1]", tree);
    if (!h1) return file.fail("Couldn't find title.");
    title = mdToString(h1);
  }

  // Find description in frontmatter.description -> first p.
  if (frontmatter.description) {
    description = frontmatter.description;
  } else {
    const p = select("paragraph", tree);
    if (!p) return file.fail("Couldn't find description.");
    description = mdToString(p);
  }

  data.post = {
    title,
    description,
    date: frontmatter.date,
    tags: frontmatter.tags || [],
    cover: generateCover({ ...frontmatter, title }),
    path: relURL,
    folder,
    slug,
  };
};

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
  const file = reader().use(postParser).processSync(vfile.readSync(absPath));
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

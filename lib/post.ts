import path from "path";
import glob from "glob";
import { URL } from "url";
import { Plugin } from "unified";
import { select } from "unist-util-select";
import mdToString from "mdast-util-to-string";
import revalidator from "revalidator";
import { PAGES_DIR } from "@/next-constants";
import isParent from "@/unist-is-parent";
import { HasFrontmatter, toVFile, getVFileData, reader } from "~/lib/remark";

/**
 * A blog post's model.
 */
export type Post = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: {
    url: string;
    width?: number;
    height?: number;
  };
  path: string;
  folder: string;
  slug: string;
};

/**
 * An object that has a blog post attached.
 */
export interface HasPost {
  post: Post;
}

/**
 * Frontmatter schema of a Markdown-based blog post.
 */
const frontmatterSchema: Revalidator.JSONSchema<any> = {
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    date: { type: "string", format: "date", required: true },
    tags: { type: "array", uniqueItems: true, maxItems: 4 },
    cover: {
      type: "object",
      properties: {
        url: { type: "string", format: "url" },
        icons: { type: "array" },
      },
    },
  },
};

const BLOG_DIR = path.join(PAGES_DIR, "blog");

const trimPagesDir = (s: string) =>
  s.startsWith(PAGES_DIR) ? s.substr(PAGES_DIR.length + 1) : s;

const trimMDXExt = (s: string) =>
  s.endsWith(".mdx") ? s.substring(0, s.length - 4) : s;

/**
 * Checks if a file is a blog post.
 * @param absPath Absolute path to the file
 */
export const isPost = (absPath: string) => absPath.startsWith(BLOG_DIR);

/**
 * Gets URL path elements to a blog post from its absolute path on the file system.
 * @param absPath Absolute path to the blog post's file
 */
export const getPostPath = (absPath: string) => {
  const trimmed = trimPagesDir(trimMDXExt(absPath));
  const folder = path.dirname(trimmed);
  const slug = path.basename(trimmed);
  return { path: `/${folder}/${slug}`, folder, slug };
};

/**
 * Generates `cover` for a blog post based on its metadata.
 * @param metadata The blog post's metadata, should has `title` and (optional) `cover`
 */
export const generatePostCover = (metadata: any): Post["cover"] => {
  const { cover, title } = metadata;
  if (cover && cover.url) return { url: cover.url };

  const url = new URL(
    encodeURIComponent(`${title}.jpg`),
    "https://img.phuctm97.com/api/v2/"
  );

  const icons: string[] = (cover && cover.icons) || [];
  for (let icon of icons) {
    url.searchParams.append("icons", icon);
  }

  return {
    url: url.toString(),
    width: 1200,
    height: 630,
  };
};

/**
 * A unified/remark plugin that parses and extracts a blog post's metadata from its file (if applicable).
 */
export const postParser: Plugin = () => (tree, file) => {
  if (!file.path) return file.fail("Unknown file path.");
  if (!isPost(file.path)) return file.message("Not a post, skip.");

  const { path: relURL, folder, slug } = getPostPath(file.path);

  const data = getVFileData<Partial<HasFrontmatter & HasPost>>(file);

  const { frontmatter } = data;
  if (!frontmatter) return file.fail("No frontmatter.");

  // Validate frontmatter.
  const validation = revalidator.validate(frontmatter, frontmatterSchema);
  if (!validation.valid)
    return file.fail(
      "Invalid frontmatter: " + JSON.stringify(validation.errors, null, 2)
    );

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
    cover: generatePostCover({ ...frontmatter, title }),
    path: relURL,
    folder,
    slug,
  };
};

/**
 * A unified/remark plugin that exports `post` from a _parsed_ MDX blog post for dynamic rendering (if applicable).
 */
export const postExporter: Plugin = () => (tree, file) => {
  const { post } = getVFileData<Partial<HasPost>>(file);
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
  const file = reader().use(postParser).processSync(toVFile(absPath));
  const { post } = getVFileData<Partial<HasPost>>(file);
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

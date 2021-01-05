import path from "path";
import glob from "glob";
import { Plugin } from "unified";
import { select } from "unist-util-select";
import mdToString from "mdast-util-to-string";
import dir from "~lib/dir";
import { MayHaveFrontmatter, reader, toVFile, getVFileData } from "~lib/remark";

export type Post = {
  title: string;
  description: string;
  path: string;
  folder: string;
  slug: string;
};

const trimPagesDir = (s: string) =>
  s.startsWith(dir.pages) ? s.substr(dir.pages.length + 1) : s;

const trimMDXExt = (s: string) =>
  s.endsWith(".mdx") ? s.substring(0, s.length - 4) : s;

export const getPostPath = (absPath: string) => {
  const trimmed = trimPagesDir(trimMDXExt(absPath));
  const folder = path.dirname(trimmed);
  const slug = path.basename(trimmed);
  return { path: `/${folder}/${slug}`, folder, slug };
};

export interface MayHavePost {
  post?: Post;
}

export const postExtracter: Plugin = () => (tree, file) => {
  if (!file.path) return file.fail("Unknown file path.");

  const { path: relURL, folder, slug } = getPostPath(file.path);

  let title = "";
  let description = "";

  const data = getVFileData<MayHaveFrontmatter & MayHavePost>(file);
  const { frontmatter } = data;

  if (frontmatter && typeof frontmatter.title === "string") {
    title = frontmatter.title;
  } else {
    const h1 = select("heading[depth=1]", tree);
    if (h1) title = mdToString(h1);
  }

  if (frontmatter && typeof frontmatter.description === "string") {
    description = frontmatter.description;
  } else {
    const p = select("paragraph", tree);
    if (p) description = mdToString(p);
  }

  data.post = {
    title,
    description,
    path: relURL,
    folder,
    slug,
  };
};

export const readPost = (absPath: string): Post | undefined => {
  const file = reader().use(postExtracter).processSync(toVFile(absPath));
  const { post } = getVFileData<MayHavePost>(file);
  return post;
};

export const getBlogFiles = () =>
  glob.sync("**/*.mdx", {
    cwd: dir.blog,
    absolute: true,
  });

export const postIsntNil = (val: Post | undefined | null): val is Post => !!val;

export const readBlog = (): Post[] =>
  getBlogFiles().map(readPost).filter(postIsntNil);

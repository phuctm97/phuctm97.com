import path from "path";
import glob from "glob";
import { Plugin } from "unified";
import { select } from "unist-util-select";
import mdToString from "mdast-util-to-string";
import dir from "~lib/dir";
import {
  HasFrontmatter,
  toVFile,
  getVFileData,
  isParent,
  createParser,
  createReader,
} from "~lib/remark";

export type Post = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  path: string;
  folder: string;
  slug: string;
};

export interface HasPost {
  post: Post;
}

export const postSchema: Revalidator.JSONSchema<Post> = {
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    date: { type: "string", format: "date", required: true },
    tags: { type: "array", uniqueItems: true, maxItems: 4 },
  },
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

export const postParser: Plugin = () => (tree, file) => {
  if (!file.path) return file.fail("Unknown file path.");

  const { path: relURL, folder, slug } = getPostPath(file.path);

  let title = "";
  let description = "";
  let date = "";
  let tags: string[] | undefined;

  const data = getVFileData<Partial<HasFrontmatter & HasPost>>(file);
  const { frontmatter } = data;

  // Find title in frontmatter.title -> first h1.
  if (frontmatter && frontmatter.title) {
    title = frontmatter.title;
  } else {
    const h1 = select("heading[depth=1]", tree);
    if (h1) title = mdToString(h1);
  }

  // Find description in frontmatter.description -> first p.
  if (frontmatter && frontmatter.description) {
    description = frontmatter.description;
  } else {
    const p = select("paragraph", tree);
    if (p) description = mdToString(p);
  }

  // Find other attributes.
  if (frontmatter) {
    date = frontmatter.date;
    tags = frontmatter.tags;
  }

  data.post = {
    title,
    description,
    date,
    tags: tags || [],
    path: relURL,
    folder,
    slug,
  };
};

export const postExporter: Plugin = () => (tree, file) => {
  const { post } = getVFileData<HasPost>(file);
  if (!post) return file.message("Not a post, skip.");

  if (!isParent(tree)) return file.fail("Tree is empty.");
  tree.children.push({
    type: "export",
    value: `export const post = ${JSON.stringify(post)};`,
  });
};

const mdParser = createParser(postSchema);
const mdReader = createReader(mdParser);

export const readPost = (absPath: string): Post | undefined => {
  const file = mdReader().use(postParser).processSync(toVFile(absPath));
  const { post } = getVFileData<HasPost>(file);
  return post;
};

export const getBlogFiles = () =>
  glob.sync("**/*.mdx", {
    cwd: dir.blog,
    absolute: true,
  });

export const postIsntNil = (val: Post | undefined | null): val is Post => !!val;

export const readBlog = (): Post[] =>
  getBlogFiles()
    .map(readPost)
    .filter(postIsntNil)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

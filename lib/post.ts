import path from "path";
import glob from "glob";
import { URL } from "url";
import { Plugin } from "unified";
import { select } from "unist-util-select";
import mdToString from "mdast-util-to-string";
import revalidator from "revalidator";
import dir from "~lib/dir";
import {
  HasFrontmatter,
  toVFile,
  getVFileData,
  isParent,
  reader,
} from "~lib/remark";

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

export interface HasPost {
  post: Post;
}

export const postFrontmatterSchema: Revalidator.JSONSchema<any> = {
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

export const postFolders = ["blog"];

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

export const isPost = (folder: string, slug: string) =>
  postFolders.includes(folder) && slug.length > 0;

export const generatePostCover = (cover: any, title: string): Post["cover"] => {
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
    height: 628,
  };
};

export const postParser: Plugin = () => (tree, file) => {
  if (!file.path) return file.fail("Unknown file path.");

  const { path: relURL, folder, slug } = getPostPath(file.path);
  if (!isPost(folder, slug)) return file.message("Not a post, skip.");

  const data = getVFileData<Partial<HasFrontmatter & HasPost>>(file);
  const { frontmatter } = data;
  if (!frontmatter) return file.fail("No frontmatter.");

  const validation = revalidator.validate(frontmatter, postFrontmatterSchema);
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
    cover: generatePostCover(frontmatter.cover, title),
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

export const readPost = (absPath: string): Post | undefined => {
  const file = reader().use(postParser).processSync(toVFile(absPath));
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

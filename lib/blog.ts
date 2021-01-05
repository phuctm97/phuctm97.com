import path from "path";
import glob from "glob";
import fs from "fs";
import remark from "remark";
import frontmatter from "remark-frontmatter";
import parseFrontmatter from "remark-parse-frontmatter";
import { select } from "unist-util-select";
import mdToString from "mdast-util-to-string";
import { getData } from "~lib/unist";

export type BlogPost = {
  title: string;
  description: string;
  folder: string;
  slug: string;
  path: string;
};

const pagesDir = path.join(process.cwd(), "pages");

export const getBlogFiles = () =>
  glob.sync("**/*.mdx", {
    cwd: path.join(pagesDir, "blog"),
    absolute: true,
  });

export const getBlogPathSegs = (absPath: string) => {
  let relPath = absPath.substr(pagesDir.length + 1); // Trim '../pages/'
  relPath = relPath.substring(0, relPath.length - 4); // Trim '.mdx'

  const folder = path.dirname(relPath);
  const slug = path.basename(relPath);
  return { folder, slug };
};

export const readBlogPost = (absPath: string): BlogPost => {
  const { folder, slug } = getBlogPathSegs(absPath);

  let title = "";
  let description = "";

  const contents = fs.readFileSync(absPath);
  remark()
    .use(frontmatter)
    .use(parseFrontmatter)
    .use(() => (tree, file) => {
      const { frontmatter } = getData(file);

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
    })
    .processSync({ contents });

  return {
    title,
    description,
    folder,
    slug,
    path: `/${folder}/${slug}`,
  };
};

import path from "path";
import glob from "glob";

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

const getPathEls = (absPath: string) => {
  let relPath = absPath.substr(pagesDir.length + 1); // Trim '../pages/'
  relPath = relPath.substring(0, relPath.length - 4); // Trim '.mdx'

  const folder = path.dirname(relPath);
  const slug = path.basename(relPath);
  return { folder, slug };
};

export const readBlogPost = (absPath: string): BlogPost => {
  const { folder, slug } = getPathEls(absPath);

  return {
    title: "",
    description: "",
    folder,
    slug,
    path: `/${folder}/${slug}`,
  };
};

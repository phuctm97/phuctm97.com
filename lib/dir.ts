import path from "path";

const pagesDir = path.join(process.cwd(), "pages");

const dir = {
  pages: pagesDir,
  blog: path.join(pagesDir, "blog"),
};

export default dir;

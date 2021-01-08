import path from "path";

const rootDir = process.cwd();

const pagesDir = path.join(rootDir, "pages");

const dir = {
  root: rootDir,
  public: path.join(rootDir, "public"),
  pages: pagesDir,
  blog: path.join(pagesDir, "blog"),
};

export default dir;

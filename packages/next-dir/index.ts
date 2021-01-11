import path from "path";

const rootDir = process.cwd();

/**
 * Absolute paths to various Next.js directories.
 */
const dir = {
  root: rootDir,
  public: path.join(rootDir, "public"),
  pages: path.join(rootDir, "pages"),
};

export default dir;

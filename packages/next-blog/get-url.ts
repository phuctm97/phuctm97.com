import path from "path";
import { PAGES_DIR } from "~/utils/const/server";

const trimPagesDir = (s: string) =>
  s.startsWith(PAGES_DIR) ? s.substr(PAGES_DIR.length + 1) : s;

const trimMDXExt = (s: string) =>
  s.endsWith(".mdx") ? s.substring(0, s.length - 4) : s;

/**
 * Gets URL path elements to a blog post from its absolute path on the file system.
 * @param absPath Absolute path to the blog post's file
 */
export default function getURLElements(absPath: string) {
  const trimmed = trimPagesDir(trimMDXExt(absPath));
  const folder = path.dirname(trimmed);
  const slug = path.basename(trimmed);
  return { path: `/${folder}/${slug}`, folder, slug };
}

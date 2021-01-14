import syspath from "path";
import { PAGES_DIR } from "~/utils/const/server";
import PKG_JSON from "~/package.json";

const trimPagesDir = (s: string) =>
  s.startsWith(PAGES_DIR) ? s.substr(PAGES_DIR.length + 1) : s;

const trimMDXExt = (s: string) =>
  s.endsWith(".mdx") ? s.substring(0, s.length - 4) : s;

export default function getURL(absPath: string) {
  const trimmed = trimPagesDir(trimMDXExt(absPath));
  const folder = syspath.dirname(trimmed);
  const slug = syspath.basename(trimmed);
  const path = `/${folder}/${slug}`;
  return { folder, slug, path, url: `${PKG_JSON.homepage}${path}` };
}

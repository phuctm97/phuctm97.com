import fs from "fs";
import path from "path";
import glob from "glob";
import prettier from "prettier";
import { ROOT_DIR, PAGES_DIR, PUBLIC_DIR } from "@/next-constants";

const trimPagesDir = (s: string) =>
  s.startsWith(PAGES_DIR) ? s.substr(PAGES_DIR.length) : s;

const trimPageExt = (s: string) => s.replace(/(index)?\.(tsx|mdx)$/g, "");

const packageJSON = JSON.parse(
  fs.readFileSync(path.join(ROOT_DIR, "package.json"), "utf-8")
);

const pages = glob
  .sync("**/*.@(tsx|mdx)", {
    cwd: PAGES_DIR,
    absolute: true,
    ignore: ["**/_*", "**/api", "**/sitemap.xml.tsx"],
  })
  .map((name) => trimPagesDir(trimPageExt(name)));

const sitemap = prettier.format(
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => `<url><loc>${`${packageJSON.homepage}${page}`}</loc></url>`)
    .join("\n")}
</urlset>
`,
  { parser: "html" }
);

fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), sitemap);

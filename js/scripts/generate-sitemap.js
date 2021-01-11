"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const prettier_1 = __importDefault(require("prettier"));
const next_dir_1 = __importDefault(require("../packages/next-dir"));
const trimPagesDir = (s) => s.startsWith(next_dir_1.default.pages) ? s.substr(next_dir_1.default.pages.length) : s;
const trimPageExt = (s) => s.replace(/(index)?\.(tsx|mdx)$/g, "");
const packageJSON = JSON.parse(fs_1.default.readFileSync(path_1.default.join(next_dir_1.default.root, "package.json"), "utf-8"));
const pages = glob_1.default
    .sync("**/*.@(tsx|mdx)", {
    cwd: next_dir_1.default.pages,
    absolute: true,
    ignore: ["**/_*", "**/api", "**/sitemap.xml.tsx"],
})
    .map((name) => trimPagesDir(trimPageExt(name)));
const sitemap = prettier_1.default.format(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => `<url><loc>${`${packageJSON.homepage}${page}`}</loc></url>`)
    .join("\n")}
</urlset>
`, { parser: "html" });
fs_1.default.writeFileSync(path_1.default.join(next_dir_1.default.public, "sitemap.xml"), sitemap);

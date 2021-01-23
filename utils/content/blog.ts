import path from "path";
import glob from "glob";
import vfile from "to-vfile";
import unified from "unified";
import parse from "remark-parse";
import frontmatter from "remark-frontmatter";
import parseFrontmatter from "remark-parse-frontmatter";
import { BlogPost } from "~/interfaces/content";
import { PAGES_DIR } from "~/constants/server";

const extractFrontmatter = require("~/unified/extract-frontmatter");
const titleFromContents = require("~/unified/title-from-contents");
const descriptionFromContents = require("~/unified/description-from-contents");
const urlElements = require("~/unified/url-elements");
const compileNothing = require("~/unified/compile-nothing");

const processor = unified()
  .use(parse)
  .use(frontmatter)
  .use(parseFrontmatter)
  .use(extractFrontmatter, {
    title: { type: "string" },
    description: { type: "string" },
    date: { type: "string", format: "date" },
  })
  .use(titleFromContents)
  .use(descriptionFromContents)
  .use(urlElements)
  .use(compileNothing);

const readOne = (absPath: string): BlogPost => {
  const file = processor.processSync(vfile.readSync(absPath));
  return file.data as BlogPost;
};

export const all = (): BlogPost[] =>
  glob
    .sync("**/*.mdx", {
      cwd: path.join(PAGES_DIR, "blog"),
      absolute: true,
    })
    .map(readOne);

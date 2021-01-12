import unified from "unified";
import parse from "remark-parse";
import frontmatter from "remark-frontmatter";
import parseFrontmatter from "remark-parse-frontmatter";
import compileNothing from "@/unified-fake-compiler";

/**
 * An object that has `frontmatter` attached.
 */
export interface HasFrontmatter {
  frontmatter: { [key: string]: any };
}

/**
 * A Markdown parser with frontmatter enabled.
 */
export const mdParser = unified()
  .use(parse)
  .use(frontmatter)
  .use(parseFrontmatter)
  .freeze();

/**
 * A Markdown reader (parse and transform) with frontmatter enabled.
 */
export const mdReader = mdParser().use(compileNothing).freeze();

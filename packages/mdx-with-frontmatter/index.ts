import unified from "unified";
import parseMd from "remark-parse";
import frontmatter from "remark-frontmatter";
import parseFrontmatter from "remark-parse-frontmatter";
import compileNothing from "~/utils/unified/compile-nothing";

/**
 * An object that has `frontmatter` attached.
 */
export interface HasFrontmatter {
  frontmatter: { [key: string]: any };
}

/**
 * A MDX parser with frontmatter enabled.
 */
export const parser = unified()
  .use(parseMd)
  .use(frontmatter)
  .use(parseFrontmatter)
  .freeze();

/**
 * A MDX reader (parse and transform) with frontmatter enabled.
 */
export const reader = parser().use(compileNothing).freeze();

import unified from "unified";
import mdParser from "remark-parse";
import frontmatter from "remark-frontmatter";
import frontmatterParser from "remark-parse-frontmatter";
import fakeCompiler from "@/unified-fake-compiler";

/**
 * An object that has `frontmatter` attached.
 */
export interface HasFrontmatter {
  frontmatter: { [key: string]: any };
}

/**
 * Default MDX parser.
 */
export const parser = unified()
  .use(mdParser)
  .use(frontmatter)
  .use(frontmatterParser)
  .freeze();

/**
 * Default MDX reader (parse and transform).
 */
export const reader = parser().use(fakeCompiler).freeze();

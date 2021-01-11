import fs from "fs";
import { VFile } from "vfile";
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

/**
 * Reads a file and returns it as a `vfile`.
 * @param absPath Absolute path to the file
 */
export const toVFile = (absPath: string): Partial<VFile> => ({
  cwd: process.cwd(),
  path: absPath,
  contents: fs.readFileSync(absPath),
});

/**
 * Assumes that `file.data` is of a type and returns it.
 * @param file A `vfile`
 */
export const getVFileData = <T = any>(file: VFile) => file.data as T;

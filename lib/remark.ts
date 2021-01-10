import fs from "fs";
import { Node, Parent } from "unist";
import { VFile } from "vfile";
import unified, { Processor, Settings } from "unified";
import mdParser from "remark-parse";
import frontmatter from "remark-frontmatter";
import frontmatterParser from "remark-parse-frontmatter";

/**
 * An object that has `frontmatter` attached.
 */
export interface HasFrontmatter {
  frontmatter: { [key: string]: any };
}

/**
 * A fake unified/remark compiler that outputs nothing, is useful to run only parse and transform.
 * @param this Unified processor
 */
export function fakeCompiler<P = Settings>(this: Processor<P>) {
  this.Compiler = () => "";
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

/**
 * Checks if a node is a parent tree (has children).
 * @param node A unist node
 */
export const isParent = (node: Node): node is Parent => !!node.children;

import fs from "fs";
import { Node, Parent } from "unist";
import { VFile } from "vfile";
import unified, { FrozenProcessor, Processor, Settings } from "unified";
import mdParser from "remark-parse";
import frontmatter from "remark-frontmatter";
import frontmatterParser from "remark-parse-frontmatter";

export interface HasFrontmatter {
  frontmatter: { [key: string]: any };
}

export function fakeCompiler<P = Settings>(this: Processor<P>) {
  this.Compiler = () => "";
}

const baseParser = unified().use(mdParser).use(frontmatter).freeze();

export const createParser = (schema?: any) => {
  return baseParser().use(frontmatterParser, schema).freeze();
};

export const createReader = (parser: FrozenProcessor) =>
  parser().use(fakeCompiler).freeze();

export const toVFile = (absPath: string): Partial<VFile> => ({
  cwd: process.cwd(),
  path: absPath,
  contents: fs.readFileSync(absPath),
});

export const getVFileData = <T = any>(file: VFile) => file.data as T;

export const isParent = (node: Node): node is Parent => !!node.children;

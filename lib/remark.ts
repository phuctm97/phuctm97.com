import fs from "fs";
import { Node, Parent } from "unist";
import { VFile } from "vfile";
import unified, { Processor, Settings } from "unified";
import mdParser from "remark-parse";
import frontmatter from "remark-frontmatter";
import frontmatterParser from "remark-parse-frontmatter";

export interface HasFrontmatter {
  frontmatter: { [key: string]: any };
}

export function fakeCompiler<P = Settings>(this: Processor<P>) {
  this.Compiler = () => "";
}

export const parser = unified()
  .use(mdParser)
  .use(frontmatter)
  .use(frontmatterParser, {
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      date: { type: "string", format: "date", required: true },
      tags: { type: "array", uniqueItems: true, maxItems: 4 },
    },
  })
  .freeze();

export const reader = parser().use(fakeCompiler).freeze();

export const toVFile = (absPath: string): Partial<VFile> => ({
  cwd: process.cwd(),
  path: absPath,
  contents: fs.readFileSync(absPath),
});

export const getVFileData = <T = any>(file: VFile) => file.data as T;

export const isParent = (node: Node): node is Parent => !!node.children;

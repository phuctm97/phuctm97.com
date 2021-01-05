import fs from "fs";
import unified, { Processor, Settings } from "unified";
import { VFile } from "vfile";
import mdParser from "remark-parse";
import frontmatter from "remark-frontmatter";
import frontmatterParser from "remark-parse-frontmatter";

export function fakeCompiler<P = Settings>(this: Processor<P>) {
  this.Compiler = () => "";
}

export const parser = unified()
  .use(mdParser)
  .use(frontmatter)
  .use(frontmatterParser)
  .freeze();

export const reader = parser().use(fakeCompiler).freeze();

export const toVFile = (absPath: string): Partial<VFile> => ({
  cwd: process.cwd(),
  path: absPath,
  contents: fs.readFileSync(absPath),
});

export interface MayHaveFrontmatter {
  frontmatter?: { [key: string]: any };
}

export const getVFileData = <T = any>(file: VFile) => file.data as T;

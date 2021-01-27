import glob from "glob";
import unified, { Processor } from "unified";
import vfile from "to-vfile";
import { Content } from "~/interfaces/content";
import { PAGES_DIR } from "~/constants/server";

const defaultPreset = require("~/unified/presets/base-read");
const defaultProcessor = unified().use(defaultPreset);

export const readOne = <T extends Content = Content>(
  filepath: string,
  processor: Processor = defaultProcessor
): T => {
  const { data } = processor.processSync(vfile.readSync(filepath));
  return data as T;
};

export const readMultiple = <T extends Content = Content>(
  pattern: string,
  processor: Processor = defaultProcessor
): T[] => {
  return glob
    .sync(pattern, { cwd: PAGES_DIR, absolute: true })
    .map((filepath) => readOne<T>(filepath, processor));
};

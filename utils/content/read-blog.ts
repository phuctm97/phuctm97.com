import unified from "unified";
import { BlogPost } from "~/interfaces/content";
import {
  readOne as readOneContent,
  readMultiple as readMultipleContent,
} from "~/utils/content/read-base";

const preset = require("~/unified/presets/blog-read");
const processor = unified().use(preset);

export const readOne = (filepath: string) =>
  readOneContent<BlogPost>(filepath, processor);

export const readBlog = () =>
  readMultipleContent<BlogPost>("blog/**/*.mdx", processor).sort(
    // Sort chronologically.
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );

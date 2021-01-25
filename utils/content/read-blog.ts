import unified from "unified";
import { BlogPost } from "~/interfaces/content";
import { readOne as read, readMultiple } from "~/utils/content/read-base";

const preset = require("~/unified/presets/read-blog");
const processor = unified().use(preset);

export const readOne = (filepath: string) =>
  read<BlogPost>(filepath, processor);

export const readBlog = () =>
  readMultiple<BlogPost>("blog/**/*.mdx", processor).sort(
    // Sort chronologically.
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );

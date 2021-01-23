import revalidator from "revalidator";
import { Content } from "~/interfaces/content";
import { isObject } from "~/utils/lang/obj";

const schema: Revalidator.JSONSchema<Content["frontmatter"]> = {
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  },
};

export default function getFrontmatter(data: unknown): Content["frontmatter"] {
  if (!isObject(data)) return {};

  const frontmatter = data.frontmatter;
  if (!isObject(frontmatter)) return {};

  const validation = revalidator.validate(frontmatter, schema);
  if (!validation.valid)
    throw new Error(
      `Invalid frontmatter: ${JSON.stringify(validation.errors, null, 2)}`
    );

  return frontmatter;
}

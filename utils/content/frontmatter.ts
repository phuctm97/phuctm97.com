import revalidator from "revalidator";
import { Frontmatter } from "~/models/content";
import { isObject } from "~/utils/lang/obj";

const schema: Revalidator.JSONSchema<Frontmatter> = {
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  },
};

export default function getFrontmatter(data: unknown): Frontmatter {
  if (!isObject(data)) return {};

  const frontmatter = data.frontmatter;
  if (!frontmatter) return {};

  if (!isObject(frontmatter)) throw new Error("Invalid frontmatter.");

  const result = revalidator.validate(frontmatter, schema);
  if (!result.valid)
    throw new Error(
      `Invalid frontmatter: ${JSON.stringify(result.errors, null, 2)}.`
    );

  return frontmatter;
}

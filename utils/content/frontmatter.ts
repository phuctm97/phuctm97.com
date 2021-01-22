import revalidator from "revalidator";
import { Frontmatter } from "~/models/content";
import { isObject, Record } from "~/utils/lang/obj";

const schema: Revalidator.JSONSchema<Frontmatter> = {
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  },
};

export const validate = (
  frontmatter: Record,
  schema: Revalidator.JSONSchema<Record>
) => {
  const result = revalidator.validate(frontmatter, schema);
  if (!result.valid)
    throw new Error(
      `Invalid frontmatter: ${JSON.stringify(result.errors, null, 2)}.`
    );
};

export default function getFrontmatter(data: unknown): Frontmatter {
  if (!isObject(data)) return {};

  const frontmatter = data.frontmatter;
  if (!frontmatter) return {};

  if (!isObject(frontmatter)) throw new Error("Invalid frontmatter.");
  validate(frontmatter, schema);

  return frontmatter;
}

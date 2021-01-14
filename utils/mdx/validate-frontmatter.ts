import revalidator from "revalidator";
import { Frontmatter } from "~/utils/mdx/interfaces";

const schema: Revalidator.JSONSchema<Frontmatter> = {
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  },
};

export default function validate<T extends Frontmatter = Frontmatter>(
  frontmatter: unknown
): frontmatter is T {
  return revalidator.validate(frontmatter as T, schema).valid;
}

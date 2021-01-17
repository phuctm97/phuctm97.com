import revalidator from "revalidator";
import { Record, isObject } from "~/utils/lang/obj";

type Frontmatter = {
  title?: string;
  description?: string;
  [key: string]: unknown;
};

const baseSchema: Revalidator.JSONSchema<Frontmatter> = {
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  },
};

const extendedSchemas: Record<Revalidator.JSONSchema<Record>> = {
  blog: {
    properties: {
      date: { type: "string", format: "date", required: true },
      tags: { type: "array", uniqueItems: true, maxItems: 4 },
      cover: {
        type: "object",
        properties: {
          url: { type: "string", format: "url" },
          icons: { type: "array", uniqueItems: true, maxItems: 4 },
        },
      },
    },
  },
};

const validate = <T>(frontmatter: T, schema: Revalidator.JSONSchema<T>) => {
  const result = revalidator.validate(frontmatter, schema);
  if (!result.valid)
    throw new Error(
      `Invalid frontmatter: ${JSON.stringify(result.errors, null, 2)}.`
    );
};

export default function getFrontmatter(
  data: unknown,
  folder: string
): Frontmatter {
  if (!isObject(data)) return {};

  const frontmatter = data.frontmatter;
  if (!frontmatter) return {};

  if (!isObject(frontmatter)) throw new Error("Invalid frontmatter.");
  validate(frontmatter, baseSchema);

  const extendedSchema = extendedSchemas[folder];
  if (extendedSchema) validate(frontmatter, extendedSchema);

  return frontmatter;
}

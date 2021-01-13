import revalidator from "revalidator";

/**
 * Frontmatter schema of a Markdown-based blog post.
 */
const frontmatterSchema: Revalidator.JSONSchema<any> = {
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    date: { type: "string", format: "date", required: true },
    tags: { type: "array", uniqueItems: true, maxItems: 4 },
    cover: {
      type: "object",
      properties: {
        url: { type: "string", format: "url" },
        icons: { type: "array" },
      },
    },
  },
};

/**
 * Validate frontmatter of a blog post.
 * @param frontmatter The blog post's frontmatter.
 */
export default function validateFrontmatter(frontmatter: any) {
  const validation = revalidator.validate(frontmatter, frontmatterSchema);
  if (!validation.valid)
    throw new Error(
      "Invalid frontmatter: " + JSON.stringify(validation.errors, null, 2)
    );
}

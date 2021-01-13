"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const revalidator_1 = __importDefault(require("revalidator"));
/**
 * Frontmatter schema of a Markdown-based blog post.
 */
const frontmatterSchema = {
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
function validateFrontmatter(frontmatter) {
    const validation = revalidator_1.default.validate(frontmatter, frontmatterSchema);
    if (!validation.valid)
        throw new Error("Invalid frontmatter: " + JSON.stringify(validation.errors, null, 2));
}
exports.default = validateFrontmatter;

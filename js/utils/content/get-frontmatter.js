"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const revalidator_1 = __importDefault(require("revalidator"));
const obj_1 = require("../../utils/lang/obj");
const baseSchema = {
    properties: {
        title: { type: "string" },
        description: { type: "string" },
    },
};
const extendedSchemas = {
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
const validate = (frontmatter, schema) => {
    const result = revalidator_1.default.validate(frontmatter, schema);
    if (!result.valid)
        throw new Error(`Invalid frontmatter: ${JSON.stringify(result.errors, null, 2)}.`);
};
function getFrontmatter(data, folder) {
    if (!obj_1.isObject(data))
        return {};
    const frontmatter = data.frontmatter;
    if (!frontmatter)
        return {};
    if (!obj_1.isObject(frontmatter))
        throw new Error("Invalid frontmatter.");
    validate(frontmatter, baseSchema);
    const extendedSchema = extendedSchemas[folder];
    if (extendedSchema)
        validate(frontmatter, extendedSchema);
    return frontmatter;
}
exports.default = getFrontmatter;

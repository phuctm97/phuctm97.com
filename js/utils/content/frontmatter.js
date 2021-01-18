"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const revalidator_1 = __importDefault(require("revalidator"));
const obj_1 = require("../../utils/lang/obj");
const schema = {
    properties: {
        title: { type: "string" },
        description: { type: "string" },
    },
};
function getFrontmatter(data) {
    if (!obj_1.isObject(data))
        return {};
    const frontmatter = data.frontmatter;
    if (!frontmatter)
        return {};
    if (!obj_1.isObject(frontmatter))
        throw new Error("Invalid frontmatter.");
    const result = revalidator_1.default.validate(frontmatter, schema);
    if (!result.valid)
        throw new Error(`Invalid frontmatter: ${JSON.stringify(result.errors, null, 2)}.`);
    return frontmatter;
}
exports.default = getFrontmatter;

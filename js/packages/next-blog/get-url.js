"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("../../utils/constants");
const trimPagesDir = (s) => s.startsWith(constants_1.PAGES_DIR) ? s.substr(constants_1.PAGES_DIR.length + 1) : s;
const trimMDXExt = (s) => s.endsWith(".mdx") ? s.substring(0, s.length - 4) : s;
/**
 * Gets URL path elements to a blog post from its absolute path on the file system.
 * @param absPath Absolute path to the blog post's file
 */
function getURLElements(absPath) {
    const trimmed = trimPagesDir(trimMDXExt(absPath));
    const folder = path_1.default.dirname(trimmed);
    const slug = path_1.default.basename(trimmed);
    return { path: `/${folder}/${slug}`, folder, slug };
}
exports.default = getURLElements;

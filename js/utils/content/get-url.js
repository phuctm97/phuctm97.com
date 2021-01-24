"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const server_1 = require("../../constants/server");
const package_json_1 = __importDefault(require("../../package.json"));
const trimPagesDir = (s) => s.startsWith(server_1.PAGES_DIR) ? s.substr(server_1.PAGES_DIR.length + 1) : s;
const trimMDXExt = (s) => s.endsWith(".mdx") ? s.substring(0, s.length - 4) : s;
function getURL(absPath) {
    const trimmed = trimPagesDir(trimMDXExt(absPath));
    const folder = path_1.default.dirname(trimmed);
    const slug = path_1.default.basename(trimmed);
    const path = `/${folder}/${slug}`;
    const url = `${package_json_1.default.homepage}${path}`;
    return { url, path, folder, slug };
}
exports.default = getURL;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../next-blog/constants");
/**
 * Checks if a file is a blog post.
 * @param absPath Absolute path to the file
 */
function isPost(absPath) {
    return absPath.startsWith(constants_1.BLOG_DIR);
}
exports.default = isPost;

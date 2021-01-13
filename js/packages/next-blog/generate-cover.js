"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
/**
 * Generates `cover` for a blog post based on its metadata.
 * @param metadata The blog post's metadata, should has `title` and (optional) `cover`
 */
function generatePostCover(metadata) {
    const { cover, title } = metadata;
    if (cover && cover.url)
        return { url: cover.url };
    const url = new url_1.URL(encodeURIComponent(`${title}.jpg`), "https://img.phuctm97.com/api/v2/");
    const icons = (cover && cover.icons) || [];
    for (let icon of icons) {
        url.searchParams.append("icons", icon);
    }
    return {
        url: url.toString(),
        width: 1200,
        height: 630,
    };
}
exports.default = generatePostCover;

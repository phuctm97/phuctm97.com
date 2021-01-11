"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if a node is a parent tree (has children).
 * @param node A unist node
 */
function isParent(node) {
    return !!node.children;
}
exports.default = isParent;

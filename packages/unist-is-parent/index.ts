import { Node, Parent } from "unist";

/**
 * Checks if a node is a parent tree (has children).
 * @param node A unist node
 */
export default function isParent(node: Node): node is Parent {
  return !!node.children;
}

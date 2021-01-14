import { Node, Parent } from "unist";

export default function isParent(node: Node): node is Parent {
  return !!node.children;
}

const visit = require("unist-util-visit");

const visitor = (node, index, parent) => {
  if (!parent || parent.tagName !== "pre") return;

  const classNames = node.properties.className || [];
  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i];
    if (!className.startsWith("language-")) continue;

    // Extra metadata from class.
    const meta = className.substr(9);
    const [lang, title] = meta.split(":");

    // Mutate nodes' properties.
    classNames[i] = `language-${lang}`;
    if (title) parent.properties["data-title"] = title;

    break;
  }
};

module.exports = () => (tree) => {
  visit(tree, { type: "element", tagName: "code" }, visitor);
};

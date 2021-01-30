const visit = require("unist-util-visit");

const getIcon = (title, icon) => {
  if (icon) return icon;
  switch (title) {
    case "next.config.js":
      return "next.js";
    case "package.json":
      return "npm";
    case "dependabot.yml":
    case "dependabot.yaml":
      return "dependabot";
    case "tailwind.config.js":
      return "tailwindcss";
  }
};

const visitor = (node, index, parent) => {
  if (!parent || parent.tagName !== "pre") return;

  const classNames = node.properties.className || [];
  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i];
    if (!className.startsWith("language-")) continue;

    // Extra metadata from class.
    const meta = className.substr(9).split(":");
    const [lang, title] = meta;
    const icon = getIcon(title, meta[2]);

    // Mutate nodes' properties.
    classNames[i] = `language-${lang}`;
    if (title) parent.properties["data-title"] = title;
    if (icon) parent.properties["data-icon"] = icon;

    break;
  }
};

module.exports = () => (tree) => {
  visit(tree, { type: "element", tagName: "code" }, visitor);
};

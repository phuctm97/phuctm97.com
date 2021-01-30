const visit = require("unist-util-visit");

const langNames = {
  js: "JavaScript",
  ts: "TypeScript",
  html: "HTML5",
  jsx: "JSX",
  tsx: "TSX",
  md: "Markdown",
  css: "CSS3",
};

const getTitle = (lang) => langNames[lang];

const getIcon = (title) => {
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
    const [lang] = meta;
    const title = meta[1] || getTitle(lang);
    const icon = meta[2] || getIcon(title);

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

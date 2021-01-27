module.exports = (path, name = "Default") => (tree, file) => {
  const { folder } = file.data;
  tree.children.unshift({
    type: "import",
    value: `import ${name} from "${path}";`,
  });
  tree.children.push({
    type: "export",
    default: true,
    value: `export default ${name};`,
  });
};

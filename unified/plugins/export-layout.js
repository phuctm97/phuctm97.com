module.exports = (importpath) => (tree, file) => {
  const { folder } = file.data;
  tree.children.unshift({
    type: "import",
    value: `import Layout from "${importpath}";`,
  });
  tree.children.push({
    type: "export",
    default: true,
    value: "export default Layout;",
  });
};

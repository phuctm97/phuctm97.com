module.exports = (attrs) => (tree, file) => {
  const { data } = file;
  tree.children.push(
    ...attrs.map((attr) => ({
      type: "export",
      value: `export const ${attr} = ${JSON.stringify(data[attr])};`,
    }))
  );
};

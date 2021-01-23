const pushExports = (tree, data, attrs) => {
  tree.children.push(
    ...attrs.map((attr) => ({
      type: "export",
      value: `export const ${attr} = ${JSON.stringify(data[attr])};`,
    }))
  );
};

module.exports = pushExports;

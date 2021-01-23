const expr = (val) => {
  if (val instanceof Date) return `new Date("${val}")`;
  return JSON.stringify(val);
};

module.exports = (attrs) => (tree, file) => {
  const { data } = file;
  tree.children.push(
    ...attrs.map((attr) => ({
      type: "export",
      value: `export const ${attr} = ${expr(data[attr])};`,
    }))
  );
};

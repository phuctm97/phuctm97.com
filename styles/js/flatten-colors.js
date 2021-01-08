const flattenColors = (colors, prefix = "") => {
  const result = {};

  const keys = Object.keys(colors);
  for (let name of keys) {
    const color = colors[name];

    if (typeof color === "object") {
      Object.assign(result, flattenColors(color, `${prefix}${name}-`));
      continue;
    }
    if (typeof color === "string") {
      result[`${prefix}${name}`] = color;
      continue;
    }

    throw new Error("Unknown colors structure.");
  }

  return result;
};

module.exports = flattenColors;

const revalidator = require("revalidator");

const extractFrontmatter = (file, properties) => {
  const frontmatter = file.data.frontmatter || {};

  const validation = revalidator.validate(frontmatter, { properties });
  if (!validation.valid)
    return file.fail(
      `Invalid frontmatter: ${JSON.stringify(validation.errors, null, 2)}.`
    );

  for (let key of Object.keys(properties)) {
    file.data[key] = frontmatter[key];
  }
};

module.exports = extractFrontmatter;

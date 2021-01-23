const pick = require("lodash/pick");
const revalidator = require("revalidator");

const extractFrontmatter = (file, properties) => {
  const { data } = file;
  if (!data.frontmatter) return {};

  const frontmatter = pick(data.frontmatter, ...Object.keys(properties));

  const validation = revalidator.validate(frontmatter, { properties });
  if (!validation.valid)
    file.fail(
      `Invalid frontmatter: ${JSON.stringify(validation.errors, null, 2)}.`
    );

  Object.assign(file.data, frontmatter);
  return frontmatter;
};

module.exports = extractFrontmatter;

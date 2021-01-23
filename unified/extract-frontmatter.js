const pick = require("lodash/pick");
const revalidator = require("revalidator");

module.exports = (properties) => (tree, file) => {
  const { data } = file;
  const frontmatter = pick(data.frontmatter || {}, ...Object.keys(properties));

  const validation = revalidator.validate(frontmatter, { properties });
  if (!validation.valid)
    file.fail(
      `Invalid frontmatter: ${JSON.stringify(validation.errors, null, 2)}.`
    );

  Object.assign(data, frontmatter);
};

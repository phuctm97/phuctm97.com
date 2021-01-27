const simpleIcons = require("simple-icons");

module.exports = () => (_, file) => {
  const { data } = file;

  const prebuiltIcon = simpleIcons.get(data.icon);
  if (!prebuiltIcon) file.fail(`Icon '${data.icon}' is not supported.`);

  data.icon = prebuiltIcon;
};

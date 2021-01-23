const path = require("path");

const ROOT_DIR = process.cwd();

const PAGES_DIR = path.join(ROOT_DIR, "pages");

const PUBLIC_DIR = path.join(ROOT_DIR, "public");

module.exports = {
  ROOT_DIR,
  PAGES_DIR,
  PUBLIC_DIR,
};

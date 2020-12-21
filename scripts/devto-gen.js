const path = require("path");
const fs = require("fs");
const matter = require("gray-matter");
const { getAllPagePaths, pagePath2URLParams } = require("./page-utils");
const { createDEVtoArticle } = require("./devto-api");

const run = async () => {
  const pagePaths = getAllPagePaths();

  for (let pagePath of pagePaths) {
    const { subpage, slug } = pagePath2URLParams(pagePath);

    const devtoPath = path.join("dev.to", subpage, `${slug}.md`);
    const devtoAbspath = path.join(process.cwd(), devtoPath);
    if (fs.existsSync(devtoAbspath)) continue;

    const {
      data: { title, description },
    } = matter(fs.readFileSync(pagePath, "utf-8"));

    const content = [
      "<!-- This is an auto-generated file, don't change it directly. -->",
      `# ${title}`,
      `File: \`${devtoPath}\`.`,
      `Created at: ${new Date().toUTCString()}.`,
      "(Working in progress)",
    ].join("\n\n");

    const res = await createDEVtoArticle({
      title,
      description,
      subpage,
      slug,
      content,
    });
    fs.writeFileSync(
      devtoAbspath,
      matter.stringify(content, {
        id: res.id,
        url: res.url,
      })
    );
  }
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

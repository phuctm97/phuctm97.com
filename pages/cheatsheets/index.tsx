import Link from "next/link";
import SEO from "~/components/seo";
import Headings from "~/components/headings";
import CheatsheetItem from "~/components/cheatsheet-item";
import Subscribe from "~/components/subscribe";
import { SiGit, SiPrettier } from "react-icons/si";

const title = "Cheatsheets";
const description = `A handful of snippets, hacks, tips, and cheatsheets I've used repeatedly and found useful.`;

const items = [
  {
    title: "gitignore",
    description: "Minimal .gitignore templates",
    icon: <SiGit fill="#f05032" size="1.5em" />,
    slug: "gitignore",
  },
  {
    title: "prettierignore",
    description: "Minimal .prettierignore templates",
    icon: <SiPrettier fill="#f7b93e" size="1.5em" />,
    slug: "prettierignore",
  },
];

const CheatsheetsPage = () => (
  <>
    <SEO title={title} description={description} />
    <Headings>
      <Headings.H1>{title}</Headings.H1>
      <Headings.H2>{description}</Headings.H2>
    </Headings>
    <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map(({ slug, ...item }) => (
        <Link key={slug} href={`/cheatsheets/${slug}`}>
          <a>
            <CheatsheetItem {...item} />
          </a>
        </Link>
      ))}
    </div>
    <Subscribe className="mt-12 md:mt-16" />
  </>
);

export default CheatsheetsPage;

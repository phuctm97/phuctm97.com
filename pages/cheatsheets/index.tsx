import { NextSeo } from "next-seo";
import Link from "next/link";
import CheatsheetItem from "~/components/cheatsheet-item";
import Subscribe from "~/components/subscribe";
import { SiGit, SiPrettier } from "react-icons/si";
import { ME } from "~/constants/share";

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
    <NextSeo title={`${title} | ${ME.name}`} description={description} />
    <h1 className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl md:text-5xl">
      {title}
    </h1>
    <h2 className="mt-4 md:mt-6">{description}</h2>
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

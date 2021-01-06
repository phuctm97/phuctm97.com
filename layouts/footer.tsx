import Emoji from "~components/emoji";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { FaDev, FaMediumM } from "react-icons/fa";
import { SiHashnode } from "react-icons/si";

const username = "phuctm97";

const socialLinks = [
  `https://twitter.com/${username}`,
  `https://github.com/${username}`,
  `https://dev.to/${username}`,
  `https://${username}.medium.com`,
  `https://linkedin.com/in/${username}`,
  `https://hashnode.com/@${username}`,
];

const iconSize = "1.3em";

const renderIcon = (link: string) => {
  if (link.includes("twitter"))
    return <FiTwitter className="stroke-current" size={iconSize} />;
  if (link.includes("dev.to"))
    return <FaDev className="fill-current" size={iconSize} />;
  if (link.includes("github"))
    return <FiGithub className="stroke-current" size={iconSize} />;
  if (link.includes("medium"))
    return <FaMediumM className="stroke-current" size={iconSize} />;
  if (link.includes("linkedin"))
    return <FiLinkedin className="stroke-current" size={iconSize} />;
  if (link.includes("hashnode"))
    return <SiHashnode className="fill-current" size={iconSize} />;
};

const getLabel = (link: string) => {
  if (link.includes("twitter")) return `Twitter @${username}`;
  if (link.includes("dev.to")) return `DEV @${username}`;
  if (link.includes("github")) return `Github @${username}`;
  if (link.includes("medium")) return `Medium @${username}`;
  if (link.includes("linkedin")) return `LinkedIn @${username}`;
  if (link.includes("hashnode")) return `Hashnode @${username}`;
};

const Footer = () => (
  <>
    <footer className="text-sm bg-gray-50 dark:bg-gray-950 px-4 pt-10 pb-12 border-t border-gray-200 dark:border-gray-800 dark:text-gray-400 lg:px-0">
      <div className="max-w-xl mx-auto">
        <p className="font-medium dark:text-gray-100">About this place</p>
        <p className="mt-2">
          Welcome to my digital garden <Emoji label="waving hand">👋🏻</Emoji>
        </p>
        <p className="mt-1">
          I'm Phuc, a software engineer. On this site, I document everything I
          learned and created. You'll see about 3 articles per week.
        </p>
        <nav className="mt-6">
          <p className="font-medium dark:text-gray-100">Social links</p>
          <p className="mt-2">
            Everywhere I'm online, you can find me @phuctm97
          </p>
          <div className="mt-3 flex flex-row space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                title={getLabel(link)}
                aria-label={getLabel(link)}
                href={link}
              >
                {renderIcon(link)}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  </>
);

export default Footer;

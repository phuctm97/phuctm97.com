import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { FaDev } from "react-icons/fa";
import { SiHashnode } from "react-icons/si";

const Footer = () => (
  <>
    <hr className="px-4 max-w-sm mx-auto" />
    <footer className="container max-w-md mx-auto mt-8 mb-12 px-4 md:px-2 lg:px-0 flex flex-col items-center text-center text-gray-700">
      <p className="font-bold">About this place</p>
      <p className="text-sm mt-2">
        Hi! On this site, I document my journey learning, creating wealth, and
        living on my terms. You'll see at least{" "}
        <strong className="font-medium">3 posts per week</strong>.
      </p>
      <nav className="flex flex-row space-x-4 md:space-x-6 mt-6">
        <a
          href="https://twitter.com/phuctm97"
          aria-label="Twitter"
          title="Twitter"
        >
          <FiTwitter className="stroke-current hover:text-black" size="1.3em" />
        </a>
        <a
          href="https://github.com/phuctm97"
          aria-label="Github"
          title="Github"
        >
          <FiGithub className="stroke-current hover:text-black" size="1.3em" />
        </a>
        <a
          href="https://linkedin.com/in/phuctm97"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <FiLinkedin
            className="stroke-current hover:text-black"
            size="1.3em"
          />
        </a>
        <a href="https://dev.to/phuctm97" aria-label="DEV.to" title="DEV.to">
          <FaDev className="stroke-current hover:text-black" size="1.3em" />
        </a>
        <a
          href="https://hashnode.to/phuctm97"
          aria-label="Hashnode"
          title="Hashnode"
        >
          <SiHashnode
            className="stroke-current hover:text-black"
            size="1.3em"
          />
        </a>
      </nav>
    </footer>
  </>
);

export default Footer;

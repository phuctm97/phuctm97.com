import Link from "next/link";
import { SiGithub } from "react-icons/si";

const Header = () => (
  <header className="sticky top-0 flex flex-col items-center py-7 bg-white bg-opacity-95 backdrop-blur">
    <div className="container max-w-3xl flex flex-row px-4 lg:px-0">
      <Link href="/">
        <a className="text-black">
          <h1 className="text-base font-bold m-0 pt-0">@phuctm97</h1>
        </a>
      </Link>
      <nav className="ml-auto flex flex-row items-center">
        <a
          aria-label="Source on Github"
          href="https://github.com/phuctm97/phuctm97.com"
        >
          <SiGithub
            className="fill-current text-gray-800 hover:text-black"
            size="1.25em"
          />
        </a>
      </nav>
    </div>
  </header>
);

export default Header;

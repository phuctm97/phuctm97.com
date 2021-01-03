import Link from "next/link";
import { SiGithub } from "react-icons/si";

const Header = () => (
  <header className="sticky top-0 z-10 bg-white bg-opacity-60 backdrop-blur">
    <div className="container-custom py-6 mx-auto flex flex-row items-center transition-all sm:py-8 lg:py-10">
      <h1 className="font-bold text-black text-base sm:text-lg md:text-xl">
        <Link href="/">@phuctm97</Link>
      </h1>
      <nav className="ml-auto">
        <Link href="https://github.com/phuctm97/phuctm97.com">
          <a
            className="block w-5 transition-all sm:w-6 md:w-7"
            aria-label="View on Github"
          >
            <SiGithub
              className="fill-current text-gray-700 hover:text-black"
              title="View on Github"
              size="100%"
            />
          </a>
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;

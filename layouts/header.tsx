import { useEffect, useState } from "react";
import NavLink from "~components/nav-link";
import { FiSun, FiMoon } from "react-icons/fi";
import classNames from "classnames";
import useDarkMode from "~hooks/dark-mode";

const labelToggleDark = "Toggle dark mode";

const navLinks = [
  ["Twitter", "https://twitter.com/phuctm97"],
  ["Github", "https://github.com/phuctm97"],
  ["Newsletter", "/newsletter"],
];

const Header = () => {
  const [isDark, toggleDark] = useDarkMode();

  const [isShrunk, setShrunk] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20)
        ) {
          return true;
        }

        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }

        return isShrunk;
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={classNames(
        "sticky top-0 z-10 py-2 my-4 md:my-6 bg-white bg-opacity-80 border-b border-transparent transition duration-500 dark:bg-black dark:text-white",
        { "border-gray-200 backdrop-blur": isShrunk }
      )}
    >
      <div className="container-custom flex flex-row items-center mx-auto">
        {isDark !== null && (
          <button
            className="bg-gray-300 p-2 md:p-3 rounded dark:bg-gray-700"
            title={labelToggleDark}
            aria-label={labelToggleDark}
            onClick={toggleDark}
          >
            {isDark ? <FiSun /> : <FiMoon className="fill-current" />}
          </button>
        )}
        <nav className="ml-auto">
          {navLinks.map((item, index) => (
            <NavLink key={index} text={item[0]} href={item[1]} />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

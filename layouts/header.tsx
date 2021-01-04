import NavLink from "~components/nav-link";
import { FiSun, FiMoon } from "react-icons/fi";
import useDarkMode from "~hooks/dark-mode";

const labelToggleDark = "Toggle dark mode";

const navLinks = [
  ["Twitter", "https://twitter.com/phuctm97"],
  ["Github", "https://github.com/phuctm97"],
  ["Newsletter", "/newsletter"],
];

const Header = () => {
  const [isDark, toggleDark] = useDarkMode();

  return (
    <header className="sticky top-0 z-10 bg-white bg-opacity-60 backdrop-blur py-4 md:py-8 transition dark:bg-black dark:text-white">
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

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSun, FiMoon } from "react-icons/fi";
import { BsCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import classNames from "classnames";

const navigation = [
  { href: "/", name: "Home" },
  { href: "/blog", name: "Blog" },
  { href: "/cheatsheets", name: "Cheatsheets" },
];

const Header = () => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { theme, setTheme } = useTheme();
  const onClickToggleDark = () => setTheme(theme === "dark" ? "light" : "dark");

  const { pathname } = useRouter();
  return (
    <nav className="sticky top-0 z-10 p-4 max-w-2xl mx-auto my-4 flex flex-row items-center backdrop-blur md:px-0 lg:max-w-3xl">
      {navigation.map(({ href, name }, index) => (
        <Link key={href} href={href}>
          <a
            className={classNames(
              "sm:ml-6 md:ml-8 text-gray-900 dark:text-gray-100",
              {
                "ml-4": index > 0,
                "font-semibold cursor-not-allowed": pathname === href,
              }
            )}
          >
            {name}
          </a>
        </Link>
      ))}
      <button
        className="ml-auto p-2 rounded bg-gray-50 dark:bg-gray-950"
        aria-label="Toggle Dark mode"
        onClick={onClickToggleDark}
      >
        {!isMounted ? (
          <BsCircle />
        ) : theme === "dark" ? (
          <FiSun />
        ) : (
          <FiMoon className="fill-current" />
        )}
      </button>
    </nav>
  );
};

export default Header;

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import { BsCircle } from "react-icons/bs";

const navigations = [
  { href: "/blog", name: "Blog" },
  { href: "/cheatsheets", name: "Cheatsheets" },
];

const Header = () => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { theme, setTheme } = useTheme();
  const onClickToggleDark = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav className="sticky top-0 z-10 p-4 max-w-2xl mx-auto my-4 flex flex-row items-center backdrop-blur md:px-0 lg:max-w-3xl">
      <h1 className="font-semibold text-gray-900 dark:text-gray-100">
        <Link href="/">Home</Link>
      </h1>
      {navigations.map(({ href, name }) => (
        <Link key={href} href={href}>
          <a className="ml-4 sm:ml-6 md:ml-8 text-gray-900 dark:text-gray-100">
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

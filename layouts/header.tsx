import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

const Header = () => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { theme, setTheme } = useTheme();
  const onClickToggleDark = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav className="sticky top-0 z-10 p-4 max-w-2xl mx-auto my-4 flex flex-row backdrop-blur md:px-0 lg:max-w-3xl">
      <h1 className="font-semibold text-gray-900 dark:text-gray-100">
        <Link href="/">Home</Link>
      </h1>
      {isMounted && (
        <button
          className="ml-auto p-2 rounded bg-gray-50 dark:bg-gray-950"
          aria-label="Toggle Dark mode"
          onClick={onClickToggleDark}
        >
          {theme === "dark" ? <FiSun /> : <FiMoon className="fill-current" />}
        </button>
      )}
    </nav>
  );
};

export default Header;

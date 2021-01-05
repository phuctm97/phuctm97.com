import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

const Header = () => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { theme, setTheme } = useTheme();
  const onToggleDark = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-10 p-4 max-w-2xl mx-auto my-4 flex flex-row bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-50 backdrop-blur md:px-0 lg:max-w-3xl">
      <h1 className="font-semibold text-gray-900 dark:text-gray-100">
        <Link href="/">Home</Link>
      </h1>
      {isMounted && (
        <button
          className="ml-auto p-2 rounded bg-gray-300 dark:bg-gray-700"
          onClick={onToggleDark}
        >
          {theme === "dark" ? <FiSun /> : <FiMoon className="fill-current" />}
        </button>
      )}
    </nav>
  );
};

export default Header;

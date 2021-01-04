import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Toggle = () => void;

const useDarkMode = (): [boolean | null, Toggle] => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Only enable Dark mode when mounted to avoid unsafe hydration.
  return [isMounted ? isDark : null, toggle];
};

export default useDarkMode;

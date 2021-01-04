import { useTheme } from "next-themes";

type Toggle = () => void;

const useDarkMode = (): [boolean, Toggle] => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return [isDark, toggle];
};

export default useDarkMode;

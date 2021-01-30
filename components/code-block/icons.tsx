import { IconType } from "react-icons";
import {
  SiCss3,
  SiDependabot,
  SiDocker,
  SiHtml5,
  SiJavascript,
  SiMarkdown,
  SiNextDotJs,
  SiNpm,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { BsCodeSlash } from "react-icons/bs";
import { VscJson } from "react-icons/vsc";
import classNames from "classnames";

// Create a transparent-first icon.
const t = (Icon: IconType, className?: string): IconType => ({
  className: extraClassName,
  ...props
}) => (
  <Icon
    {...props}
    className={classNames("fill-current", className, extraClassName)}
  />
);

// Create a black-first icon.
const b = (Icon: IconType, className?: string): IconType => ({
  className: extraClassName,
  ...props
}) => (
  <div className="bg-gray-800 dark:bg-transparent">
    <Icon
      {...props}
      className={classNames("fill-current", className, extraClassName)}
    />
  </div>
);

const js = b(SiJavascript, "text-yellow-300");
const ts = t(SiTypescript, "text-blue-600 dark:text-blue-400");
const jsx = t(SiReact, "text-blue-500 dark:text-blue-300");
const json = t(VscJson);
const npm = t(SiNpm, "text-red-500 dark:text-red-400");
const nextJS = t(SiNextDotJs);
const dependabot = t(SiDependabot, "text-blue-600 dark:text-blue-400");
const tailwindcss = t(SiTailwindcss, "text-green-600 dark:text-green-400");
const docker = t(SiDocker, "text-blue-500 dark:text-blue-300");
const markdown = t(SiMarkdown);
const html = t(SiHtml5, "text-yellow-600 dark:text-yellow-500");
const css = t(SiCss3, "text-blue-600 dark:text-blue-400");
const code = t(BsCodeSlash);

const ICONS: { [key: string]: IconType } = {
  js,
  ts,
  jsx,
  tsx: jsx,
  json,
  npm,
  "next.js": nextJS,
  dependabot,
  tailwindcss,
  docker,
  dockerfile: docker,
  markdown,
  md: markdown,
  html,
  css,
  code,
};

export default ICONS;

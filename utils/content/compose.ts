import { Plugin } from "~/models/content";

export default function compose(plugins: Plugin[]): Plugin {
  return (frontmatter, content) => {
    let curr = content;
    for (let f of plugins) {
      curr = f(frontmatter, curr);
    }
    return curr;
  };
}

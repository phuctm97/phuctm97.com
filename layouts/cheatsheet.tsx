import { Cheatsheet } from "~/interfaces/content";
import SEO from "~/components/seo";
import Subscribe from "~/components/subscribe";

const CheatsheetLayout = (props: React.PropsWithChildren<Cheatsheet>) => {
  const { title, description, icon, children } = props;
  return (
    <>
      <SEO title={title} description={description} />
      <article className="prose prose-sm mx-auto sm:prose md:prose-md dark:prose-dark">
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill={`#${icon.hex}`}
          className="mb-6 sm:mb-8"
          width="4em"
        >
          <title>{icon.title}</title>
          <path d={icon.path} />
        </svg>
        {children}
      </article>
      <Subscribe className="mt-14 md:mt-16" />
    </>
  );
};

export default CheatsheetLayout;

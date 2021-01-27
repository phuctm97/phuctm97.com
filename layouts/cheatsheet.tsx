import { NextSeo } from "next-seo";
import { Cheatsheet } from "~/interfaces/content";
import Subscribe from "~/components/subscribe";
import { ME } from "~/constants/share";

const CheatsheetLayout = (props: React.PropsWithChildren<Cheatsheet>) => {
  const { title, description, url, icon, children } = props;
  return (
    <>
      <NextSeo
        title={`${title} | ${ME.name}`}
        description={description}
        canonical={url}
        openGraph={{
          type: "article",
          title: `${title} | ${ME.name}`,
          description,
          url,
        }}
      />
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

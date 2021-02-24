import { GetStaticProps } from "next";
import Link from "next/link";
import { BlogPost } from "~/interfaces/content";
import SEO from "~/components/seo";
import Headings from "~/components/headings";
import Emoji from "~/components/emoji";
import Subscribe from "~/components/subscribe";
import { ME } from "~/constants/share";
import { readBlog } from "~/utils/content/read-blog";

type Props = {
  blog: BlogPost[];
};

const IndexPage = ({ blog }: Props) => (
  <>
    <SEO />
    <Headings>
      <Headings.H1 isTighter>Hey, I’m {ME.name}</Headings.H1>
      <Headings.H2>
        I'm a software engineer. I love building SaaS for makers and developers{" "}
        <Emoji label="heart">💚</Emoji>.{" "}
        <a className="underline" href="https://twitter.com/phuctm97">
          I share my journey daily on Twitter
        </a>
        .
      </Headings.H2>
      <Headings.H3>
        On this site, I occasionally write programming tutorials and lessons I
        learned from bootstrapping SaaS.
      </Headings.H3>
    </Headings>
    <Subscribe className="mt-8" />
    <section className="mt-10 md:mt-12 lg:mb-24">
      <h2 className="font-bold tracking-tight text-2xl text-gray-900 dark:text-gray-100 sm:text-3xl">
        Blog
      </h2>
      <h3 className="mt-2 md:mt-3 text-sm sm:text-base">
        Personal documentary: 100% authentic, good for inspiration.
      </h3>
      {blog.map(({ title, description, path }) => (
        <article key={path} className="mt-8">
          <Link href={path}>
            <a>
              <h4 className="font-semibold text-lg leading-5 dark:text-gray-200 sm:text-xl">
                {title}
              </h4>
              <p className="mt-2 text-sm line-clamp-2 text-gray-500 sm:text-base">
                {description}
              </p>
            </a>
          </Link>
        </article>
      ))}
    </section>
  </>
);

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { blog: readBlog() },
});

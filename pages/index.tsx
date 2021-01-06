import { GetStaticProps } from "next";
import Link from "next/link";
import Emoji from "~components/emoji";
import { Post, readBlog } from "~lib/post";

type Props = {
  blog: Post[];
};

const IndexPage = ({ blog }: Props) => (
  <>
    <h1 className="font-extrabold text-2xl tracking-tighter text-gray-900 dark:text-gray-100 sm:text-3xl md:text-5xl">
      Hey, I’m Minh-Phuc Tran
    </h1>
    <h2 className="mt-4 md:mt-6 text-sm sm:text-base">
      I'm a software engineer. Welcome to my digital garden{" "}
      <Emoji label="Waving hand">👋🏻</Emoji>
    </h2>
    <h3 className="mt-2 text-sm sm:text-base">
      On this site, I document everything I learned and created. You may expect
      to see <strong>3 articles per week</strong>.
    </h3>
    <section className="mt-10 md:mt-12">
      <h2 className="font-bold tracking-tight text-2xl text-gray-900 dark:text-gray-100 sm:text-3xl">
        Blog
      </h2>
      <h3 className="mt-2 md:mt-3 text-sm sm:text-base">
        Personal documentary: 100% authentic, good for inspiration, not
        evergreen.
      </h3>
      {blog.map(({ title, description, path }) => (
        <article key={path} className="mt-8">
          <Link href={path}>
            <a>
              <h4 className="font-semibold text-lg leading-5 dark:text-gray-200 sm:text-xl">
                {title}
              </h4>
              <div className="overflow-hidden">
                <p className="mt-2 text-sm line-clamp-2 text-gray-500 sm:text-base">
                  {description}
                </p>
              </div>
            </a>
          </Link>
        </article>
      ))}
    </section>
  </>
);

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { blog: readBlog() },
  };
};

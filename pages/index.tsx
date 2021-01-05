import { GetStaticProps } from "next";
import Link from "next/link";
import Emoji from "~components/emoji";
import { BlogPost, getBlogFiles, readBlogPost } from "~lib/blog";

type Props = {
  blog: Array<BlogPost>;
};

const IndexPage = ({ blog }: Props) => (
  <>
    <h1 className="font-black text-xl sm:text-3xl md:text-5xl tracking-tight">
      Hey, I’m Minh-Phuc Tran
    </h1>
    <h2 className="mt-4 text-sm text-gray-700 sm:text-base">
      I'm a Software Engineer. Welcome to my digital garden{" "}
      <Emoji label="waving hand">👋🏻</Emoji>
    </h2>
    <h3 className="mt-2 text-sm text-gray-700 sm:text-base">
      On this site, I document my journey of learning, making products, and
      pursuing freedom. You may expect to see{" "}
      <strong className="font-semibold">3 articles per week</strong>.
    </h3>
    <section className="mt-8">
      <h2 className="font-bold tracking-tight text-xl sm:text-2xl md:text-3xl">
        Blog
      </h2>
      <h3 className="mt-2 text-sm text-gray-700 sm:text-base">
        Personal documentary: 100% authentic, not always well-researched, better
        gradually.
      </h3>
      {blog.map(({ title, path }) => (
        <article key={path} className="mt-8">
          <Link href={path}>
            <a>
              <h4 className="font-medium text-lg leading-5 text-gray-900 sm:text-xl">
                {title}
              </h4>
              <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                no v1 was released a couple of months ago and there were a lot
                of different opinions about it.
              </p>
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
    props: { blog: getBlogFiles().map(readBlogPost) },
  };
};

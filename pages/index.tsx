import { GetStaticProps } from "next";
import Link from "next/link";
import Emoji from "~components/emoji";
import { Post, readBlog } from "~lib/post";

type Props = {
  blog: Post[];
};

const IndexPage = ({ blog }: Props) => (
  <>
    <h1 className="font-black text-2xl tracking-tight text-gray-900 sm:text-3xl md:text-5xl">
      Hey, I’m Minh-Phuc Tran
    </h1>
    <h2 className="mt-4 text-base sm:text-lg">
      I'm a Software Engineer. Welcome to my digital garden{" "}
      <Emoji label="Waving hand">👋🏻</Emoji>
    </h2>
    <h3 className="mt-2 text-base sm:text-lg">
      On this site, I document my journey of learning, making products, and
      pursuing freedom. You may expect to see{" "}
      <strong>3 articles per week</strong>.
    </h3>
    <section className="mt-10">
      <h2 className="font-bold tracking-tight text-2xl text-gray-900 sm:text-3xl">
        Blog
      </h2>
      <h3 className="mt-2 text-base sm:text-lg">
        Personal documentary: 100% authentic, not always well-researched, better
        gradually.
      </h3>
      {blog.map(({ title, description, path }) => (
        <article key={path} className="mt-8">
          <Link href={path}>
            <a>
              <h4 className="font-semibold text-lg leading-5 sm:text-xl">
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

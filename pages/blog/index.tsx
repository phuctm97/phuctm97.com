import { GetStaticProps } from "next";
import Link from "next/link";
import { BlogPost } from "~/interfaces/content";
import SEO from "~/components/seo";
import Subscribe from "~/components/subscribe";
import { readBlog } from "~/utils/content/read-blog";

type Props = {
  blog: BlogPost[];
};

const title = "Blog";
const description = `Personal documentary: 100% authentic, good for inspiration, not evergreen.`;

const BlogPage = ({ blog }: Props) => (
  <>
    <SEO title={title} description={description} />
    <h1 className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl md:text-5xl">
      {title}
    </h1>
    <h2 className="mt-4 md:mt-6">{description}</h2>
    {blog.map(({ title, description, path }) => (
      <article key={path} className="mt-8 md:mt-10">
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
    <Subscribe className="mt-12" />
  </>
);

export default BlogPage;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { blog: readBlog() },
});

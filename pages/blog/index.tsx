import { GetStaticProps } from "next";
import Link from "next/link";
import { BlogPost } from "~/interfaces/content";
import SEO from "~/components/seo";
import Headings from "~/components/headings";
import Subscribe from "~/components/subscribe";
import { readBlog } from "~/utils/content/read-blog";

type Props = {
  blog: BlogPost[];
};

const title = "Blog";
const description = `Personal documentary: 100% authentic, good for inspiration.`;

const BlogPage = ({ blog }: Props) => (
  <>
    <SEO title={title} description={description} />
    <Headings>
      <Headings.H1>{title}</Headings.H1>
      <Headings.H2>{description}</Headings.H2>
    </Headings>
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

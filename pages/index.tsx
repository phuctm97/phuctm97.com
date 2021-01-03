import { GetStaticProps } from "next";
import Link from "next/link";
import Header from "~components/header";
import Footer from "~components/footer";
import Prose from "~components/prose";
import Subscribe from "~components/subscribe";
import styles from "./index.module.css";

import path from "path";
import glob from "glob";
import readPost from "~utils/read-post";

type Props = {
  blogPosts: Array<{
    title: string;
    description: string;
    path: string;
  }>;
};

const HomePage = ({ blogPosts }: Props) => (
  <>
    <Header />
    <Prose>
      <h1>Hey, I’m Minh-Phuc Tran</h1>
      <p className="lead">
        I'm a software engineer. On this site, I document my journey learning,
        creating wealth, and living on my terms. You'll see at least{" "}
        <strong>3 posts per week</strong>.
      </p>
      <section>
        <h2>Newsletter</h2>
        <p className="lead">
          Every Sunday, I sent out my latest tech discovery and nuances that is
          hardly found anywhere else.
        </p>
        <Subscribe />
      </section>
      <section>
        <h2>Blog</h2>
        <p className="lead">
          My written documentary: 100% authentic, good for inspiration, not
          evergreen.
        </p>
        {blogPosts.map((post) => (
          <article key={post.path} className={styles.post}>
            <Link href={`/${post.path}`}>
              <a>
                <h3>{post.title}</h3>
                <p className="text-gray-600 font-normal">{post.description}</p>
              </a>
            </Link>
          </article>
        ))}
      </section>
    </Prose>
    <Footer />
  </>
);

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogPosts = glob
    .sync("**/*.mdx", {
      cwd: path.join(process.cwd(), "pages", "blog"),
      absolute: true,
    })
    .map((filename) => readPost(filename))
    .sort((a, b) => b.publishedTime - a.publishedTime)
    .map((post) => ({
      title: post.title,
      description: post.description,
      path: post.path,
    }));

  return {
    props: { blogPosts },
  };
};

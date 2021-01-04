import { GetStaticProps } from "next";
import Header from "~layouts/header";
import Footer from "~layouts/footer";
import Main from "~layouts/main";
import Prose from "~layouts/prose";
import Subscribe from "~components/subscribe";
import PostPreview from "~components/post-preview";

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
    <Main>
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
            Every Sunday, I sent out my latest tech discovery and nuances that
            is hardly found anywhere else.
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
            <PostPreview key={post.path} {...post} />
          ))}
        </section>
      </Prose>
    </Main>
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

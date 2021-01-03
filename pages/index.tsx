import { GetStaticProps } from "next";
import Link from "next/link";
import Header from "~components/header";
import Footer from "~components/footer";

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

const subscribeNewsletter = () => {
  window.open("https://buttondown.email/phuctm97", "popupwindow");
};

const HomePage = ({ blogPosts }: Props) => (
  <>
    <Header />
    <main className="container max-w-2xl mx-auto px-4 md:px-0">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
        Hey, I’m Minh-Phuc Tran
      </h1>
      <h2 className="text-gray-700 mt-2 md:mt-4">
        ✌🏻 I'm a software engineer. On this site, I document my journey
        learning, creating wealth, and living on my terms. You'll see at least{" "}
        <strong className="font-semibold">3 posts per week</strong>.
      </h2>
      <section className="mt-12 md:mt-14">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
          Newsletter
        </h2>
        <h3 className="text-gray-700 mt-2 md:mt-4">
          📧 Every Sunday, I sent out my latest tech discovery and nuances that
          is hardly found anywhere else.
        </h3>
        <form
          className="mt-4"
          action="https://buttondown.email/api/emails/embed-subscribe/phuctm97"
          method="post"
          target="popupwindow"
          onSubmit={subscribeNewsletter}
        >
          <label className="hidden" htmlFor="bd-email">
            Enter your email:
          </label>
          <input
            type="email"
            name="email"
            id="bd-email"
            className="border border-gray-300 py-1 px-4 rounded mr-2 mb-2"
            placeholder="your@email.com"
          />
          <input className="hidden" type="hidden" value="1" name="embed" />
          <button
            className="bg-gray-200 border borderr-gray-200 py-1 px-4 mb-2 rounded font-semibold hover:bg-gray-300 transition-colors"
            name="submit"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Blog</h2>
        <h3 className="text-gray-700 mt-2 md:mt-4">
          ✍🏻 My written documentary: 100% authentic, good for inspiration, not
          evergreen.
        </h3>
        {blogPosts.map((post) => (
          <article key={post.path} className="mt-8">
            <Link href={`/${post.path}`}>
              <a>
                <h4 className="text-lg md:text-xl font-medium tracking-tight">
                  {post.title}
                </h4>
                <p className="text-gray-500 mt-1 md:mt-2">{post.description}</p>
              </a>
            </Link>
          </article>
        ))}
      </section>
    </main>
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

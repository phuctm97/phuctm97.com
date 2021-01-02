import { GetStaticProps } from "next";
import Link from "next/link";
import Header from "~components/header";
import path from "path";
import glob from "glob";
import readPost from "~utils/read-post";

type Props = {
  blogPosts: Array<{
    title: string;
    path: string;
  }>;
};

const IndexPage = ({ blogPosts }: Props) => {
  const onSubscribeNewsletter = () => {
    window.open("https://buttondown.email/phuctm97", "popupwindow");
  };

  return (
    <>
      <Header />
      <main>
        <h1 className="text-black font-bold text-5xl mb-8">
          Hey, I'm Minh-Phuc Tran.
        </h1>
        <p className="text-gray-900 mb-8">
          I'm a Software Engineer. Growing as a developer can be lonely and
          challenging sometimes, I document my ups and downs here to hopefully
          motivate you. If you're looking for help or just a friend,{" "}
          <a
            className="text-blue-600 font-medium underline hover:text-blue-700"
            href="https://twitter.com/phuctm97"
          >
            feel free to DM me on Twitter
          </a>
          , I'll reply as soon as possible.
        </p>
        <section className="mb-8">
          <h2 className="text-black font-bold text-3xl mb-4">Newsletter</h2>
          <p className="text-gray-900 mb-4">
            In my newsletter, I share early and behind-the-scene look into what
            I’m working on and learning about software development. Most
            importantly, it's a way for you and me to establish a closer
            relationship and hopefully can help each other in the future.
          </p>
          <form
            action="https://buttondown.email/api/emails/embed-subscribe/phuctm97"
            method="post"
            target="popupwindow"
            onSubmit={onSubscribeNewsletter}
          >
            <label htmlFor="bd-email" className="text-gray-900">
              Enter your email:{" "}
            </label>
            <input
              type="email"
              name="email"
              id="bd-email"
              className="border border-gray-500 rounded-sm p-1 mr-2"
            />
            <input type="hidden" value="1" name="embed" />
            <input
              type="submit"
              value="Subscribe"
              className="bg-gray-100 py-1 px-3 rounded-sm cursor-pointer hover:bg-gray-200"
            />
          </form>
          <p className="text-sm ml-28 text-gray-900">
            <em>(No spam, unsubscribe anytime)</em>
          </p>
        </section>
        <section>
          <h2 className="text-black font-bold text-3xl mb-4">Blog</h2>
          <p className="mb-4">
            My free-flowing thoughts and ideas: 100% authentic, good for
            inspiration, not always true.
          </p>
          <ul>
            {blogPosts.map(({ title, path }) => (
              <li key={path} className="mt-2 ">
                <Link href={`/${path}`}>
                  <a className="text-blue-600 font-medium underline hover:text-blue-700">
                    {title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blogPosts = glob
    .sync("**/*.mdx", {
      root: path.join(process.cwd(), "pages", "blog"),
      absolute: true,
    })
    .map((filename) => readPost(filename))
    .sort((a, b) => b.publishedTime - a.publishedTime)
    .map((post) => ({ title: post.title, path: post.path }));

  return {
    props: { blogPosts },
  };
};

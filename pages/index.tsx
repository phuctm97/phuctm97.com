import Link from "next/link";
import Header from "~components/header";

const IndexPage = () => {
  const posts = [
    {
      link: "/blog/a-quick-exploration-with-deno",
      text: "A Quick Exploration With Deno",
    },
    {
      link: "/blog/imagegen-as-a-service-introduction",
      text: "Imagegen as a Service (Free), All Bloggers Should Have One",
    },
    {
      link: "/blog/i-change-my-mind-abt-tailwind-css",
      text: "I Changed My Mind After 2nd Try TailwindCSS",
    },
    {
      link: "/blog/introducing-hashnode-sdk-js",
      text: "Introducing Hashnode SDK for TypeScript/JavaScript",
    },
    {
      link: "/blog/parse-frontmatter-mdx-remark-unified",
      text: "Parse Markdown Frontmatter In MDX, Remark, and Unified",
    },
    {
      link: "/blog/publish-first-npm-package",
      text: "Publish My First NPM TypeScript Package",
    },
    {
      link: "/blog/being-ambitious-is-a-myth",
      text: "Being Ambitious Is A Myth",
    },
    {
      link: "/blog/auto-distribute-posts-to-dev-to",
      text: "Automate Distributing My Posts to DEV.to",
    },
    {
      link: "/blog/my-custom-md-language",
      text: "Create an MDX Plugin To Have My Own Markdown Language",
    },
    {
      link: "/blog/switch-to-next-js-and-mdx",
      text: "Switch to Next.js and MDX",
    },
    {
      link: "/blog/hello-world-start-blog-in-html",
      text: "Hello, World!I Started My Blog In Plain HTML",
    },
  ];

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
            {posts.map(({ link, text }) => (
              <li key={link} className="mt-2 ">
                ·{"  "}
                <Link href={link}>
                  <a className="text-blue-600 font-medium underline hover:text-blue-700">
                    {text}
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

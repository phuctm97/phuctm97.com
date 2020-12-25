import Link from "next/link";

const IndexPage = () => {
  const posts = [
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
      <header>
        <h1>Hi, I'm Minh-Phuc Tran</h1>
        <p>
          I'm a Software Engineer. I share my learnings and opinions about
          software development here. Hope it helps.
        </p>
        <p>
          <em>
            My website is currently in just HTML, though it's good enough to
            read, my articles are automatically distributed to{" "}
            <a href="https://dev.to/phuctm97">
              my DEV.to, feel free to go there
            </a>{" "}
            if you prefer more colorful format. There are also about 50+ other
            blog posts on{" "}
            <a href="https://blog.phuctm97.com">blog.phuctm97.com</a> and{" "}
            <a href="https://phuctm97.medium.com">Medium</a>.
          </em>
        </p>
        <p>
          Besides, <a href="https://twitter.com/phuctm97">DM me on Twitter</a>{" "}
          if you have any question or need help.
        </p>
      </header>
      <main>
        <section>
          <h2>Newsletter</h2>
          <p>
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
            <label htmlFor="bd-email">Enter your email: </label>
            <input type="email" name="email" id="bd-email" />
            <input type="hidden" value="1" name="embed" />
            <input type="submit" value="Subscribe" />
          </form>
          <sup>
            <em>(No spam, unsubscribe anytime)</em>
          </sup>
        </section>
        <section>
          <h2>Blog</h2>
          <p>
            My free-flowing thoughts and ideas: 100% authentic, good for
            inspiration, not always true.
          </p>
          <ul>
            {posts.map(({ link, text }) => (
              <li key={link}>
                <Link href={link}>{text}</Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default IndexPage;

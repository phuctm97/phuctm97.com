import Link from "next/link";

const IndexPage = () => {
  const posts = [
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
          <em>
            Besides, <a href="https://twitter.com/phuctm97">DM me on Twitter</a>{" "}
            if you have any question or need help.
          </em>
        </p>
      </header>
      <main>
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

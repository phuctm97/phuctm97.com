import Link from "next/link";
import Header from "~components/header";
import styles from "./index.module.scss";

const IndexPage = () => {
  const posts = [
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
      <main className={styles.page}>
        <div className={styles.container}>
          <h1>Hey, I'm Minh-Phuc Tran.</h1>
          <p>
            I'm a Software Engineer. Growing as a developer can be lonely and
            challenging sometimes, I document my ups and downs here to hopefully
            motivate you. If you're looking for help or just a friend,{" "}
            <a href="https://twitter.com/phuctm97">
              feel free to DM me on Twitter
            </a>
            , I'll reply as soon as possible.
          </p>
          <section>
            <h2>Newsletter</h2>
            <p>
              In my newsletter, I share early and behind-the-scene look into
              what I’m working on and learning about software development. Most
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
        </div>
      </main>
    </>
  );
};

export default IndexPage;

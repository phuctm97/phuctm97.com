import Link from "next/link";

const IndexPage = () => (
  <>
    <header>
      <h1>Hi, I'm Minh-Phuc Tran</h1>
      <p>
        I'm a Software Engineer. I share my learnings and opinions about
        software development here. Hope it helps.
      </p>
      <p>
        <em>
          I'm rebuilding my website, meanwhile you can checkout my articles at{" "}
          <a href="https://blog.phuctm97.com">blog.phuctm97.com</a>,{" "}
          <a href="https://phuctm97.medium.com">Medium</a>, and{" "}
          <a href="https://dev.to/phuctm97">DEV.to</a>.
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
          <li>
            <Link href="/blog/my-custom-md-language">
              Create an MDX Plugin To Have My Own Markdown Language
            </Link>
          </li>
          <li>
            <Link href="/blog/switch-to-next-js-and-mdx">
              Switch to Next.js and MDX
            </Link>
          </li>
          <li>
            <Link href="/blog/hello-world-start-blog-in-html">
              Hello, World! I Started My Blog In Plain HTML
            </Link>
          </li>
        </ul>
      </section>
    </main>
  </>
);

export default IndexPage;

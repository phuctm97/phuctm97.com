import Link from "next/link";
import Page from "~components/Page";

const IndexPage = () => (
  <Page
    title="Minh-Phuc Tran - Software Engineer"
    description="Hi, I'm Phuc. I write and discuss coding tutorials, programming guides, career, and life in tech."
  >
    <header>
      <h1>Hi, I'm Minh-Phuc Tran</h1>
      <p>
        I'm a Software Engineer. I share my learnings and opinions about
        software development here. Hope it helps.
      </p>
      <p>
        <em>
          (I'm rebuilding my website, meanwhile you can checkout my blog at{" "}
          <a href="https://blog.phuctm97.com">blog.phuctm97.com</a>,{" "}
          <a href="https://phuctm97.medium.com">Medium</a>, and{" "}
          <a href="https://dev.to/phuctm97">DEV.to</a>.
        </em>
      </p>
    </header>
    <main>
      <section>
        <h2>Blog</h2>
        <ul>
          <li>
            <Link href="/blog/hello-world">
              Hello, World! I Started My Blog In Plain HTML
            </Link>
          </li>
          <li>
            <Link href="/blog/use-next-and-mdx">Use Next.js and MDX</Link>
          </li>
        </ul>
      </section>
    </main>
  </Page>
);

export default IndexPage;

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
        I'm a Software Engineer. I write and discuss coding tutorials,
        programming guides, career, and life in tech.
      </p>
    </header>
    <main>
      <section>
        <h2>Blog</h2>
        <ul>
          <li>
            <Link href="/blog/1-hello-world">
              Hello, World! I Started My Blog In Plain HTML
            </Link>
          </li>
        </ul>
      </section>
    </main>
  </Page>
);

export default IndexPage;

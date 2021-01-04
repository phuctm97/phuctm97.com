import Header from "~layouts/header";
import Main from "~layouts/main";
import Footer from "~layouts/footer";
import Content from "./sample.mdx";

const TestLayout = () => (
  <>
    <Header />
    <Main>
      <Content />
    </Main>
    <Footer />
  </>
);

export default TestLayout;

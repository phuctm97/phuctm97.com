import Header from "~layouts/header";
import Main from "~layouts/main";
import Prose from "~layouts/prose";
import Footer from "~layouts/footer";

const MDXDefaultLayout: React.FC = ({ children }) => (
  <>
    <Header />
    <Main>
      <Prose>{children}</Prose>
    </Main>
    <Footer />
  </>
);

export default MDXDefaultLayout;

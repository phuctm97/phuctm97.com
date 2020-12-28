import Link from "next/link";
import { SiGithub } from "react-icons/si";
import styles from "./header.module.scss";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.link}>
          <h1>@phuctm97</h1>
        </a>
      </Link>
      <nav>
        <a
          className={styles["icon-button"]}
          href="https://github.com/phuctm97/phuctm97.com"
        >
          <SiGithub size="1.25em" />
        </a>
      </nav>
    </div>
  </header>
);

export default Header;

import { PropsWithChildren } from "react";
import styles from "./main.module.css";

type Props = PropsWithChildren<{}>;

const Main = ({ children }: Props) => (
  <main className={styles.main}>{children}</main>
);

export default Main;

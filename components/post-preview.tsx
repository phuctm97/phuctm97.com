import Link from "next/link";
import styles from "./post-preview.module.css";

type Props = {
  title: string;
  path: string;
  description: string;
};

const PostPreview = ({ title, path, description }: Props) => (
  <article className={styles.post}>
    <Link href={`/${path}`}>
      <a>
        <h3>{title}</h3>
        <p className="text-gray-600 font-normal">{description}</p>
      </a>
    </Link>
  </article>
);

export default PostPreview;

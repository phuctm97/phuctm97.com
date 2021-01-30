import Link from "next/link";
import Image from "next/image";

type Props = {
  author: { name: string; url: string; avatarURL: string };
  date: Date;
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const Published = ({ author, date }: Props) => (
  <div className="published">
    <Image
      className="avatar"
      src={author.avatarURL}
      alt={author.name}
      width={24}
      height={24}
    />
    <p className="paragraph">
      <Link href={author.url}>
        <a className="author-name">{author.name}</a>
      </Link>{" "}
      on {formatDate(date)}
    </p>
  </div>
);

export default Published;

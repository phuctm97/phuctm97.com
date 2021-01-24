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
  <div className="info flex flex-row items-center space-x-2">
    <Image
      className="rounded-full"
      src={author.avatarURL}
      alt={author.name}
      width={24}
      height={24}
    />
    <p>
      <Link href={author.url}>
        <a className="tracking-tight">{author.name}</a>
      </Link>{" "}
      on {formatDate(date)}
    </p>
  </div>
);

export default Published;

import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

const NavLink = ({ text, href }: Props) => (
  <Link href={href}>
    <a className="font-medium p-4 rounded hover:bg-gray-100 dark:hover:bg-gray-900">
      {text}
    </a>
  </Link>
);

export default NavLink;

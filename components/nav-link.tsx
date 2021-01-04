import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

const NavLink = ({ text, href }: Props) => (
  <Link href={href}>
    <a className="font-medium py-2 px-1.5 sm:px-2 md:p-4 rounded text-sm md:text-base hover:bg-gray-100 dark:hover:bg-gray-900">
      {text}
    </a>
  </Link>
);

export default NavLink;

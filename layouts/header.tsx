import Link from "next/link";

const Header = () => (
  <nav className="sticky top-0 z-10 p-4 max-w-2xl mx-auto my-4 bg-white bg-opacity-80 md:px-0">
    <h1 className="font-medium">
      <Link href="/">Home</Link>
    </h1>
  </nav>
);

export default Header;

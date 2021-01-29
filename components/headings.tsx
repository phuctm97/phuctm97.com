import classNames from "classnames";

type Components = {
  H1: React.FC<{ isTighter?: boolean }>;
  H2: React.FC;
  H3: React.FC;
};

const Headings: React.FC & Components = ({ children }) => (
  <hgroup>{children}</hgroup>
);

Headings.H1 = ({ isTighter, children }) => (
  <h1
    className={classNames(
      "font-extrabold text-2xl text-gray-900 dark:text-gray-100 sm:text-3xl md:text-5xl",
      {
        "tracking-tight": !isTighter,
        "tracking-tighter": isTighter,
      }
    )}
  >
    {children}
  </h1>
);

Headings.H2 = ({ children }) => (
  <h2 className="text-sm sm:text-base mt-4 md:mt-6">{children}</h2>
);

Headings.H3 = ({ children }) => (
  <h3 className="text-sm sm:text-base mt-2">{children}</h3>
);

export default Headings;

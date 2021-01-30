import Copy from "~/components/code-block/copy";
import ICONS from "~/components/code-block/icons";

type Props = React.PropsWithChildren<
  {
    title: string;
    icon: string;
  } & React.ComponentProps<typeof Copy>
>;

const WithTitle = ({ title, icon, children, ...copy }: Props) => {
  const Icon = ICONS[icon] || ICONS["code"];
  return (
    <div className="code-block">
      <div className="flex flex-row items-center justify-between px-3.5 sm:px-4 py-2 sm:py-3 rounded-t font-mono font-semibold text-xs sm:text-sm bg-gray-200 dark:bg-gray-700">
        <div className="flex flex-row items-center space-x-1 sm:space-x-1.5">
          <Icon size="1.25em" aria-hidden />
          <span>{title}</span>
        </div>
        <Copy {...copy} />
      </div>
      {children}
    </div>
  );
};

export default WithTitle;

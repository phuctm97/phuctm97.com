import Copy from "~/components/code-block/copy";

type Props = React.PropsWithChildren<
  {
    title: string;
  } & React.ComponentProps<typeof Copy>
>;

const WithTitle = ({ title, children, ...copy }: Props) => (
  <div className="code-block">
    <div className="flex flex-row items-center justify-between px-3.5 sm:px-4 py-2 sm:py-3 rounded-t font-mono font-semibold text-xs sm:text-sm bg-gray-200 dark:bg-gray-700">
      {title}
      <Copy {...copy} />
    </div>
    {children}
  </div>
);

export default WithTitle;

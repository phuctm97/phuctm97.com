import Copy from "~/components/code-block/copy";

type Props = React.PropsWithChildren<React.ComponentProps<typeof Copy>>;

const NoTitle = ({ children, ...copy }: Props) => (
  <div className="relative group">
    {children}
    <div className="absolute top-4 right-2.5 font-semibold text-sm opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
      <Copy {...copy} />
    </div>
  </div>
);

export default NoTitle;

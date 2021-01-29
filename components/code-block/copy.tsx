import { MdContentCopy, MdDone } from "react-icons/md";

type Props = {
  isCopied: boolean;
  onClickCopy: React.MouseEventHandler<HTMLButtonElement>;
};

const Copy = ({ isCopied, onClickCopy }: Props) => {
  const label = isCopied ? "Copied" : "Copy";
  const Icon = isCopied ? MdDone : MdContentCopy;

  return (
    <button
      className="opacity-70 hover:opacity-100 disabled:opacity-100 disabled:cursor-default"
      onClick={onClickCopy}
      disabled={isCopied}
      title={label}
      aria-label={label}
    >
      <Icon className="fill-current" size="1.2em" />
    </button>
  );
};

export default Copy;

import { MdContentCopy, MdDone } from "react-icons/md";

type Props = {
  isCopied: boolean;
  onClickCopy: React.MouseEventHandler<HTMLButtonElement>;
};

const iconStyles = {
  className: "fill-current",
  size: "1.2em",
};

const Copy = ({ isCopied, onClickCopy }: Props) => (
  <button
    className="opacity-70 hover:opacity-100 disabled:opacity-100 disabled:cursor-default"
    onClick={onClickCopy}
    disabled={isCopied}
  >
    {isCopied ? (
      <MdDone aria-label="Copied" {...iconStyles} />
    ) : (
      <MdContentCopy aria-label="Copy" {...iconStyles} />
    )}
  </button>
);

export default Copy;

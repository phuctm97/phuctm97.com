import { useRef, useState } from "react";
import copy from "copy-to-clipboard";
import WithTitle from "~/components/code-block/with-title";
import NoTitle from "~/components/code-block/no-title";
import { SECONDS } from "~/constants/share";

const delayCopied = 5 * SECONDS;

interface Props extends React.HTMLProps<HTMLPreElement> {
  "data-title"?: string;
}

const CodeBlock = ({ "data-title": title, ...props }: Props) => {
  const ref = useRef<HTMLPreElement>(null);

  const [isCopied, setCopied] = useState(false);
  const onClickCopy = () => {
    if (isCopied) return;

    if (!ref.current) throw new Error("Ref is nil.");
    copy(ref.current.textContent || "");

    setCopied(true);
    setTimeout(() => setCopied(false), delayCopied);
  };
  const copyProps = { isCopied, onClickCopy };

  return title ? (
    <WithTitle title={title} {...copyProps}>
      <pre ref={ref} {...props} />
    </WithTitle>
  ) : (
    <NoTitle {...copyProps}>
      <pre ref={ref} {...props} />
    </NoTitle>
  );
};

export default CodeBlock;

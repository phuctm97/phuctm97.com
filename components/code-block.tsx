import { useRef, useState } from "react";
import copy from "copy-to-clipboard";

const delayCopied = 5000;

const CodeBlock = (props: React.HTMLProps<HTMLPreElement>) => {
  const ref = useRef<HTMLPreElement>(null);
  const [isCopied, setCopied] = useState(false);

  const onClickCopy = () => {
    if (isCopied) return;

    if (!ref.current) throw new Error("Ref is nil.");
    copy(ref.current.textContent || "");

    setCopied(true);
    setTimeout(() => setCopied(false), delayCopied);
  };

  return (
    <div className="code-toolbar">
      <pre ref={ref} {...props} />
      <div className="toolbar">
        <button className="copy" onClick={onClickCopy} disabled={isCopied}>
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;

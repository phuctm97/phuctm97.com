import { useRef, useState } from "react";
import copyToClipboard from "copy-to-clipboard";
import { SECONDS } from "~/constants/share";

const useCopyableRef = <T extends HTMLElement = HTMLElement>(
  delay: number = 4 * SECONDS
) => {
  const ref = useRef<T>(null);

  const [isCopied, setCopied] = useState(false);
  const copy = () => {
    if (isCopied) return;

    if (!ref.current) throw new Error("Ref is nil.");
    copyToClipboard(ref.current.textContent || "");

    setCopied(true);
    setTimeout(() => setCopied(false), delay);
  };

  return { ref, isCopied, copy };
};

export default useCopyableRef;

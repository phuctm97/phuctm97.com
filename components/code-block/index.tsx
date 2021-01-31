import WithTitle from "~/components/code-block/with-title";
import NoTitle from "~/components/code-block/no-title";
import classNames from "classnames";
import useCopyableRef from "~/hooks/useCopyableRef";

interface Props extends React.HTMLProps<HTMLPreElement> {
  "data-title"?: string;
  "data-icon"?: string;
}

const getLangIcon = (className?: string) =>
  className?.startsWith("language-") ? className.substr(9) : "code";

const CodeBlock = ({
  "data-title": title,
  "data-icon": icon,
  className,
  ...props
}: Props) => {
  const { ref, isCopied, copy } = useCopyableRef<HTMLPreElement>();

  const content = (
    <pre ref={ref} className={classNames("content", className)} {...props} />
  );

  return title ? (
    <WithTitle
      title={title}
      icon={icon || getLangIcon(className)}
      isCopied={isCopied}
      onClickCopy={copy}
    >
      {content}
    </WithTitle>
  ) : (
    <NoTitle isCopied={isCopied} onClickCopy={copy}>
      {content}
    </NoTitle>
  );
};

export default CodeBlock;

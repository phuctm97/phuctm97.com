import classNames from "classnames";

interface Props extends React.HTMLProps<HTMLDivElement> {
  tags: string[];
}

const Tags = ({ className, tags, ...htmlAttrs }: Props) => (
  <div {...htmlAttrs} className={classNames("tags", className)}>
    {tags.map((tag) => (
      <p key={tag} className="tag">
        {tag}
      </p>
    ))}
  </div>
);

export default Tags;

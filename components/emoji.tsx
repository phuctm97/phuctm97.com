interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  children: string;
}

const Emoji = ({ label, children, ...htmlAttrs }: Props) => (
  <span
    {...htmlAttrs}
    role="img"
    aria-label={label}
    aria-hidden={label ? undefined : true}
  >
    {children}
  </span>
);

export default Emoji;

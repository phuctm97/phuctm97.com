type Props = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  label?: string;
  children: string;
};

const Emoji = ({ label, children, ...spanAttrs }: Props) => (
  <span
    {...spanAttrs}
    role="img"
    aria-hidden={label ? undefined : true}
    aria-label={label ? label : undefined}
  >
    {children}
  </span>
);

export default Emoji;

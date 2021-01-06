const Wrapper: React.FC = ({ children }) => (
  <article className="prose prose-sm sm:prose dark:prose-dark">
    {children}
  </article>
);

export { Wrapper as wrapper };

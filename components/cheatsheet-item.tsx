type Props = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const CheatsheetItem = ({ icon, title, description }: Props) => (
  <article className="border border-gray-200 dark:border-gray-600 rounded-md p-5">
    {icon}
    <h3 className="font-bold mt-4 mb-1 text-xl">{title}</h3>
    <p>{description}</p>
  </article>
);

export default CheatsheetItem;

type Props = {
  tags: string[];
};

const Tags = ({ tags }: Props) => (
  <div className="tags flex flex-row flex-wrap mt-2 sm:mt-3 mb-8 text-sm">
    {tags.map((tag) => (
      <p
        key={tag}
        className="font-medium bg-gray-100 text-gray-600 dark:bg-gray-950 dark:text-gray-400 px-2 py-1 rounded"
      >
        {tag}
      </p>
    ))}
  </div>
);

export default Tags;

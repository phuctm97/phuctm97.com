import { FiMail } from "react-icons/fi";
import classNames from "classnames";

const submitThroughPopup = () => {
  window.open("https://buttondown.email/phuctm97", "popupwindow");
};

const Subscribe = ({
  className,
  ...htmlAttrs
}: React.HTMLProps<HTMLDivElement>) => (
  <article
    {...htmlAttrs}
    className={classNames(
      "border border-blue-200 rounded p-4 sm:p-6 dark:border-blue-800 bg-blue-50 dark:bg-blue-900",
      className
    )}
  >
    <h4 className="inline-flex items-center text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
      Subscribe to the newsletter <FiMail className="ml-1.5" size="1.2em" />
    </h4>
    <p className="mt-2 text-sm sm:text-base text-gray-800 dark:text-gray-200">
      Every Sunday, I write an email summarizing lessons I've learned that week
      and practical advices for you.
    </p>
    <form
      className="relative mt-4 mb-2 text-sm sm:text-base"
      action="https://buttondown.email/api/emails/embed-subscribe/phuctm97"
      method="post"
      target="popupwindow"
      onSubmit={submitThroughPopup}
    >
      <label className="hidden" htmlFor="email">
        Email for newsletter
      </label>
      <input
        className="px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        id="email"
        name="email"
        type="email"
        placeholder="your@email.com"
        autoComplete="email"
        required
      />
      <input
        className="hidden"
        id="embed"
        name="embed"
        type="hidden"
        value="1"
      />
      <button
        className="flex items-center justify-center absolute right-1 top-1 px-4 font-bold h-7 sm:h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
        id="submit"
        name="submit"
        type="submit"
      >
        Subscribe
      </button>
    </form>
  </article>
);

export default Subscribe;

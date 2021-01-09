import { FormEvent, useState } from "react";
import { FiMail } from "react-icons/fi";
import { CgCheckO, CgDanger, CgSpinner } from "react-icons/cg";
import classNames from "classnames";

type Result = {
  success: boolean;
  message: string;
};

const Subscribe = ({
  className,
  ...htmlAttrs
}: React.HTMLProps<HTMLDivElement>) => {
  const [email, setEmail] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;
    try {
      setLoading(true);
      setResult(undefined);

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const { message } = await res.json();
      setResult({ success: res.ok, message });
    } catch (err) {
      setResult({
        success: false,
        message: "There was an error subscribing, please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
        Every Sunday, I write an email summarizing lessons I've learned that
        week and practical advices for you.
      </p>
      {result && result.success ? (
        <p className="font-medium mt-5 mb-2 text-sm sm:text-base text-green-700 dark:text-green-300">
          <CgCheckO className="inline-block -mt-1 fill-current" />{" "}
          {result.message}
        </p>
      ) : (
        <form
          className="relative mt-4 mb-2 text-sm sm:text-base"
          onSubmit={onSubmit}
        >
          <input
            className={classNames(
              "px-3 sm:px-4 py-2 mt-1 block w-full rounded-md",
              "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
              "autofill:text-fill-gray-900 autofill:shadowfill-white dark:autofill:shadowfill-gray-800 dark:autofill:text-fill-gray-100",
              "outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
            )}
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            required
            aria-label="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <button
            className="flex items-center justify-center absolute right-1 top-1 px-4 font-bold h-7 sm:h-8 rounded w-24 sm:w-28 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <CgSpinner className="fill-current animate-spin" size="1.25rem" />
            ) : (
              "Subscribe"
            )}
          </button>
          {result && !result.success && (
            <p className="font-medium mt-3 text-sm sm:text-base text-red-700 dark:text-red-300">
              <CgDanger className="inline-block -mt-1 fill-current" />{" "}
              {result.message}
            </p>
          )}
        </form>
      )}
    </article>
  );
};

export default Subscribe;

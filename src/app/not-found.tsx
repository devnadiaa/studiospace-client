import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-6 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/10">
          <Search size={42} className="text-violet-600" />
        </div>

        <p className="text-7xl font-bold text-violet-600 sm:text-8xl">
          404
        </p>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Oops! Page Not Found
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
          The page you are looking for might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-700 transition hover:border-violet-500 hover:text-violet-600 dark:border-gray-700 dark:text-gray-300"
          >
            <ArrowLeft size={18} />
            Explore Studios
          </Link>
        </div>

        <p className="mt-10 text-sm font-medium text-gray-400">
          StudioSpace — Your Space. Your Creative Freedom.
        </p>
      </div>
    </section>
  );
};

export default NotFound;
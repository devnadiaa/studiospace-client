import Link from "next/link";
import { Aperture, Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gray-50 px-6 py-16 dark:bg-gray-950">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-100 blur-3xl dark:bg-violet-500/10" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-100 blur-3xl dark:bg-violet-500/10" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-3xl bg-violet-100 shadow-sm dark:bg-violet-500/10">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-white">
            <Aperture size={34} strokeWidth={1.8} />
            <span className="absolute h-3 w-3 rounded-full bg-white" />
          </div>
        </div>

        <p className="text-7xl font-black tracking-tight text-violet-600 sm:text-8xl">
          404
        </p>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Oops! Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
          The creative space you are looking for could not be found. It may
          have been moved, removed, or the address may be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-700"
          >
            <Home size={18} />
            Return to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:border-violet-500 hover:text-violet-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <Search size={18} />
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

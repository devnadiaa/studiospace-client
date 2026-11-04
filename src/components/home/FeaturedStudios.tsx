import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";

type Studio = {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  rating?: number;
  address: string;
  city: string;
  country: string;
  hourlyRate: number;
};

const FeaturedStudios = async () => {
  const backendUrl = (
    process.env.BACKEND_URL || "http://localhost:5000"
  ).replace(/\/$/, "");

  let studios: Studio[] = [];

  try {
    const response = await fetch(`${backendUrl}/studios`, {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      studios = Array.isArray(data) ? data : [];
    }
  } catch {
    studios = [];
  }

  const featuredStudios = studios.slice(0, 6);

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-14 dark:bg-gray-950 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end sm:gap-5">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
              DISCOVER YOUR SPACE
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Featured Studios
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
              Explore inspiring creative spaces designed to bring your next
              big idea to life.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
          >
            View All Studios
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {featuredStudios.length > 0 ? (
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {featuredStudios.map((studio) => (
              <div
                key={studio._id}
                className="group w-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative h-44 overflow-hidden bg-gray-100 sm:h-56 dark:bg-gray-800">
                  <img
                    src={studio.imageUrl}
                    alt={studio.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  <span className="absolute top-3 left-3 max-w-[65%] truncate rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold text-violet-700 shadow-sm sm:top-4 sm:left-4 sm:px-3">
                    {studio.category}
                  </span>

                  <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-800 shadow-sm sm:top-4 sm:right-4 sm:px-3">
                    {studio.rating ? (
                      <>
                        <Star
                          size={13}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        {studio.rating}
                      </>
                    ) : (
                      "New Studio"
                    )}
                  </span>
                </div>

                <div className="min-w-0 p-4 sm:p-5">
                  <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                    {studio.title}
                  </h3>

                  <div className="mt-3 flex min-w-0 items-start gap-2 text-xs leading-5 text-gray-500 dark:text-gray-400 sm:text-sm">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-violet-500"
                    />

                    <span className="min-w-0 break-words">
                      {studio.address}, {studio.city}, {studio.country}
                    </span>
                  </div>

                  <div className="mt-4 flex min-w-0 items-center justify-between gap-2 border-t border-gray-100 pt-4 dark:border-gray-800 sm:mt-5">
                    <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${studio.hourlyRate}
                      </span>{" "}
                      / hr
                    </p>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="rounded-lg bg-violet-600 px-3 py-2.5 text-xs font-semibold whitespace-nowrap text-white transition hover:bg-violet-700 sm:px-4 sm:text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center dark:border-gray-700 sm:py-16">
            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              No studios are available right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedStudios;
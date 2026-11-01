import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";

const studios = [
  {
    id: 1,
    category: "Photography Studio",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 2,
    category: "Film Production Studio",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    category: "Podcast Room",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 4,
    category: "Music Recording Studio",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 5,
    category: "Art Workshop",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 6,
    category: "Creative Workspace",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85",
  },
];

const FeaturedStudios = () => {
  return (
    <section className="bg-white px-6 py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
              DISCOVER YOUR SPACE
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Featured Studios
            </h2>

            <p className="mt-3 max-w-xl text-gray-500 dark:text-gray-400">
              Explore inspiring creative spaces designed to bring your next
              big idea to life.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
          >
            View All Studios
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <div
              key={studio.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={studio.image}
                  alt={studio.category}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
                  {studio.category}
                </span>

                <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  4.9
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Creative Studio Space
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={16} className="text-violet-500" />
                  Studio Location
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      $XX
                    </span>
                    {" "}/ hr
                  </p>

                  <Link
                    href="/studios"
                    className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStudios;
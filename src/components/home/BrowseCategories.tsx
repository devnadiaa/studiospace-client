import Link from "next/link";
import {
  Camera,
  Mic,
  Headphones,
  Music,
  Palette,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Photo Studios",
    description: "Professional spaces for photography and portraits.",
    icon: <Camera size={28} />,
    link: "/studios?category=Photo%20Studios",
  },
  {
    name: "Sound Stages",
    description: "Spacious stages for film and video production.",
    icon: <Mic size={28} />,
    link: "/studios?category=Sound%20Stages",
  },
  {
    name: "Podcast Rooms",
    description: "Create quality podcasts in equipped rooms.",
    icon: <Headphones size={28} />,
    link: "/studios?category=Podcast%20Rooms",
  },
  {
    name: "Music Suites",
    description: "Creative spaces for music and audio production.",
    icon: <Music size={28} />,
    link: "/studios?category=Music%20Suites",
  },
  {
    name: "Art Workshops",
    description: "Inspiring spaces for art and creative projects.",
    icon: <Palette size={28} />,
    link: "/studios?category=Art%20Workshops",
  },
];

const BrowseCategories = () => {
  return (
    <section className="bg-gray-50 px-6 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
            EXPLORE BY CATEGORY
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Find Your Perfect Creative Space
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500 dark:text-gray-400">
            Explore different types of creative studios and find the
            perfect space for your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              href={category.link}
              key={category.name}
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-950">
                {category.icon}
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h3>

                <ArrowUpRight
                  size={20}
                  className="text-gray-400 transition group-hover:text-violet-600"
                />
              </div>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
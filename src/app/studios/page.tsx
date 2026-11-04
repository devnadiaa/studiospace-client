"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Star,
  ArrowUpRight,
  Aperture,
  SlidersHorizontal,
  Sparkles,
  Compass,
  RotateCcw,
} from "lucide-react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const categories = [
  "All Studios",
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Sound Stage",
];

const categoryMap: Record<string, string> = {
  "Photo Studios": "Photo Studio",
  "Sound Stages": "Sound Stage",
  "Podcast Rooms": "Podcast Lounge",
  "Music Suites": "Music Suite",
  "Art Workshops": "Workshop",
};

export default function StudiosPage() {
  const [studios, setStudios] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Studios");
  const [sortOption, setSortOption] = useState("Recommended");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");

    if (requestedCategory) {
      const mappedCategory =
        categoryMap[requestedCategory] || requestedCategory;

      if (categories.includes(mappedCategory)) {
        setSelectedCategory(mappedCategory);
      }
    }

    const fetchStudios = async () => {
      try {
        const response = await fetch(`${API_URL}/studios`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to load studios");
        }

        const data = await response.json();
        setStudios(Array.isArray(data) ? data : []);
      } catch {
        setStudios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  const handleSearch = () => {
    setAppliedSearch(searchText);
  };

  const clearFilters = () => {
    setSearchText("");
    setAppliedSearch("");
    setSelectedCategory("All Studios");
    setSortOption("Recommended");
  };

  const filteredStudios = studios.filter((studio) => {
    const search = appliedSearch.toLowerCase();

    const matchesSearch =
      String(studio.title || "").toLowerCase().includes(search) ||
      String(studio.address || "").toLowerCase().includes(search) ||
      String(studio.city || "").toLowerCase().includes(search) ||
      String(studio.country || "").toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All Studios" ||
      studio.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedStudios = [...filteredStudios];

  if (sortOption === "Price: Low to High") {
    sortedStudios.sort(
      (a, b) => Number(a.hourlyRate || 0) - Number(b.hourlyRate || 0)
    );
  } else if (sortOption === "Price: High to Low") {
    sortedStudios.sort(
      (a, b) => Number(b.hourlyRate || 0) - Number(a.hourlyRate || 0)
    );
  } else if (sortOption === "Top Rated") {
    sortedStudios.sort(
      (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 pb-20 dark:bg-gray-950">
      <div className="relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-600/10" />

        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-600/10" />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-10 lg:px-8 lg:pb-14 lg:pt-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold tracking-widest text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
              <Sparkles size={15} />
              EXPLORE CREATIVE SPACES
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                Studio
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400">
              Discover inspiring studios, professional spaces, and creative
              environments for your next project.
            </p>

            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-violet-100/50 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
                  <Search size={21} className="shrink-0 text-violet-500" />

                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    placeholder="Search by studio name or location..."
                    aria-label="Search studios"
                    className="h-12 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                  />
                </div>

                <button
                  onClick={handleSearch}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 text-sm font-bold text-white transition hover:bg-violet-700"
                >
                  <Search size={18} />
                  Search Studios
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-gray-400">
              <Compass size={15} />
              Find a space. Create something amazing.
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-2">
            <Aperture size={19} className="text-violet-600" />

            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-white">
              Browse by Category
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-200 ${
                  selectedCategory === category
                    ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-200 dark:shadow-none"
                    : "border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-violet-500/50 dark:hover:bg-violet-500/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-7 flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Available Studios
              </h2>

              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                {sortedStudios.length}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Showing {sortedStudios.length} creative spaces for your next
              project.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SlidersHorizontal
              size={18}
              className="shrink-0 text-gray-400"
            />

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              aria-label="Sort studios"
              className="h-11 min-w-44 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-violet-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="h-56 animate-pulse bg-gray-200 dark:bg-gray-800" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-10 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedStudios.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900 sm:py-20">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-100/70 blur-3xl dark:bg-violet-500/10" />

            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <Aperture size={48} strokeWidth={1.5} />
            </div>

            <div className="relative mx-auto mt-7 max-w-md">
              <p className="text-xs font-bold tracking-widest text-violet-600">
                NO MATCHING SPACES
              </p>

              <h3 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                No Studios Found
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                We couldn't find any creative spaces matching your search.
                Try another keyword or explore all available studios.
              </p>

              <button
                onClick={clearFilters}
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                <RotateCcw size={17} />
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {sortedStudios.map((studio) => {
              const location = [
                studio.address,
                studio.city,
                studio.country,
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <div
                  key={studio._id}
                  className="group overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-violet-500/30 dark:hover:shadow-none"
                >
                  <Link
                    href={`/studios/${studio._id}`}
                    className="relative block h-60 overflow-hidden bg-gray-100 dark:bg-gray-800"
                  >
                    <img
                      src={studio.imageUrl}
                      alt={studio.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-violet-700 shadow-sm backdrop-blur-md">
                      {studio.category}
                    </span>

                    <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-md">
                      {studio.rating ? (
                        <>
                          <Star
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          {studio.rating}
                        </>
                      ) : (
                        "New Studio"
                      )}
                    </span>

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-semibold text-white">
                      <MapPin size={15} />
                      {studio.city || studio.country || "Creative Space"}
                    </div>
                  </Link>

                  <div className="p-5">
                    <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
                      {studio.title}
                    </h3>

                    <div className="mt-3 flex min-h-10 items-start gap-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-violet-500"
                      />

                      <span className="line-clamp-2">
                        {location || "Location not specified"}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5 dark:border-gray-800">
                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          Starting from
                        </p>

                        <p className="mt-1 text-xl font-extrabold text-gray-900 dark:text-white">
                          ${studio.hourlyRate}
                          <span className="ml-1 text-xs font-medium text-gray-400">
                            / hr
                          </span>
                        </p>
                      </div>

                      <Link
                        href={`/studios/${studio._id}`}
                        className="inline-flex h-10 items-center gap-2 rounded-xl bg-violet-600 px-4 text-xs font-bold text-white transition hover:bg-violet-700"
                      >
                        View Details
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
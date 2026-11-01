"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Star,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  "All Studios",
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Sound Stage",
];

export default function StudiosPage() {
  const [studios, setStudios] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Studios");
  const [sortOption, setSortOption] = useState("Recommended");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudios = async () => {
      const response = await fetch("http://localhost:5000/studios");
      const data = await response.json();

      setStudios(data);
      setLoading(false);
    };

    fetchStudios();
  }, []);

  const handleSearch = () => {
    setAppliedSearch(searchText);
  };

  const filteredStudios = studios.filter((studio) => {
    const search = appliedSearch.toLowerCase();

    const matchesSearch =
      studio.title.toLowerCase().includes(search) ||
      studio.address.toLowerCase().includes(search) ||
      studio.city.toLowerCase().includes(search) ||
      studio.country.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All Studios" ||
      studio.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedStudios = [...filteredStudios];

  if (sortOption === "Price: Low to High") {
    sortedStudios.sort((a, b) => a.hourlyRate - b.hourlyRate);
  } else if (sortOption === "Price: High to Low") {
    sortedStudios.sort((a, b) => b.hourlyRate - a.hourlyRate);
  } else if (sortOption === "Top Rated") {
    sortedStudios.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
            EXPLORE CREATIVE SPACES
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            Find Your Perfect Studio
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-400">
            Discover inspiring studios, professional spaces, and
            creative environments for your next project.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 px-4 dark:border-gray-700">
              <Search size={20} className="text-gray-400" />

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search studios by name or location..."
                className="h-12 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
              />
            </div>

            <button
              onClick={handleSearch}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              <Search size={18} />
              Search Studios
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-7 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Available Studios
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Showing {sortedStudios.length} creative spaces
            </p>
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
          </select>
        </div>

        {loading ? (
          <p className="py-12 text-center text-gray-500">
            Loading studios...
          </p>
        ) : sortedStudios.length === 0 ? (
          <div className="rounded-2xl bg-white py-16 text-center dark:bg-gray-900">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No Studios Found
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Try searching with a different name or location.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedStudios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={studio.imageUrl}
                    alt={studio.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
                    {studio.category}
                  </span>

                  <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
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
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {studio.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="text-violet-500" />
                    {studio.address}, {studio.city}, {studio.country}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${studio.hourlyRate}
                      </span>
                      / hr
                    </p>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                      View Details
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
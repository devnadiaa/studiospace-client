import Link from "next/link";
import {
  Plus,
  MapPin,
  Pencil,
  Trash2,
  Building2,
  ArrowRight,
} from "lucide-react";

const MyListingsPage = async () => {
  const response = await fetch("http://localhost:5000/studios", {
    cache: "no-store",
  });

  const allStudios = await response.json();

  const studios = allStudios.filter(
    (studio: any) => studio.hostEmail === "user@example.com",
  );

  const totalListings = studios.length;
  const availableStudios = studios.length;
  const bookedStudios = 0;

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
              HOST DASHBOARD
            </p>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              My Studio Listings
            </h1>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Manage your creative spaces and keep your listings up to date.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <Plus size={18} />
            Add New Studio
          </Link>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950">
              <Building2 size={22} />
            </div>

            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
              Total Listings
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
              {totalListings}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-950">
              <Building2 size={22} />
            </div>

            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
              Available Studios
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
              {availableStudios}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950">
              <Building2 size={22} />
            </div>

            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
              Booked Studios
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
              {bookedStudios}
            </h2>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Your Listings
          </h2>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {studios.length} Studios
          </span>
        </div>

        {studios.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900">
            <Building2
              size={40}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              No Studio Listings Yet
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Add your first creative space to get started.
            </p>

            <Link
              href="/add-studio"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              <Plus size={18} />
              Add New Studio
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio: any) => (
              <div
                key={studio._id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative h-56">
                  <img
                    src={studio.imageUrl}
                    alt={studio.title}
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-violet-600 shadow-sm">
                    {studio.category}
                  </span>

                  <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                    Available
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {studio.title}
                  </h3>

                  <p className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="text-violet-500" />
                    {studio.address}, {studio.city}, {studio.country}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${studio.hourlyRate}
                      </span>
                      / hour
                    </p>

                    <Link
                      href={`/studios/edit/${studio._id}`}
                      className="flex items-center gap-1 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
                    >
                      <Pencil size={15} />
                      Update
                    </Link>
                  </div>

                  <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
                  >
                    <Trash2 size={16} />
                    Delete Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-violet-50 p-6 dark:bg-violet-950/20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Want to list another creative space?
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Share your studio with creators and grow your hosting
                opportunities.
              </p>
            </div>

            <Link
              href="/add-studio"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Add Studio
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyListingsPage;
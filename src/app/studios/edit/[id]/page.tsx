import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Users,
  Image,
  CheckCircle,
  Plus,
} from "lucide-react";

const amenities = [
  "Professional Lighting",
  "High-Speed Wi-Fi",
  "Air Conditioning",
  "Parking Available",
  "Photography Equipment",
  "Soundproof Room",
  "Waiting Area",
  "Changing Room",
];

const EditStudioPage = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/my-listings"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-violet-600 dark:text-gray-400"
        >
          <ArrowLeft size={18} />
          Back to My Listings
        </Link>

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
            MANAGE YOUR SPACE
          </p>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Edit Studio
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Update your studio information and keep your listing up to date.
          </p>
        </div>

        <form className="space-y-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                <Building2 className="text-violet-600" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Basic Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update your studio details.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Studio Title
                </label>
                <input
                  type="text"
                  defaultValue="Modern Photography Studio"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none transition focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Studio Category
                  </label>
                  <select
                    defaultValue="Photo Studios"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                  >
                    <option>Photo Studios</option>
                    <option>Sound Stages</option>
                    <option>Podcast Rooms</option>
                    <option>Music Suites</option>
                    <option>Art Workshops</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Maximum Capacity
                  </label>
                  <div className="relative">
                    <Users
                      size={18}
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="number"
                      defaultValue="10"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-transparent pl-11 pr-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Detailed Overview
                </label>
                <textarea
                  rows={5}
                  defaultValue="A beautiful and professional creative space designed for photographers, content creators, and creative professionals."
                  className="w-full rounded-xl border border-gray-200 bg-transparent p-4 text-sm outline-none transition focus:border-violet-500 dark:border-gray-700 dark:text-white"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                <DollarSign className="text-violet-600" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Pricing Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Set your studio rental prices.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  defaultValue="45"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Security Deposit ($)
                </label>
                <input
                  type="number"
                  defaultValue="100"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                <MapPin className="text-violet-600" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Location Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update where your studio is located.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Full Address
                </label>
                <input
                  type="text"
                  defaultValue="Gulshan, Dhaka, Bangladesh"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    defaultValue="Dhaka"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Country
                  </label>
                  <input
                    type="text"
                    defaultValue="Bangladesh"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                <Image className="text-violet-600" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Studio Image
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update your studio cover image.
                </p>
              </div>
            </div>

            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              defaultValue="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
              className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Studio Amenities
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select the facilities available in your studio.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {amenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 p-3 text-sm text-gray-600 transition hover:border-violet-300 dark:border-gray-800 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    defaultChecked={[
                      "Professional Lighting",
                      "High-Speed Wi-Fi",
                      "Air Conditioning",
                    ].includes(amenity)}
                    className="h-4 w-4 accent-violet-600"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Host Information
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Your account information cannot be changed here.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Host Name
                </label>
                <input
                  type="text"
                  value="Studio Host"
                  readOnly
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 text-sm text-gray-500 outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Host Email
                </label>
                <input
                  type="email"
                  value="host@example.com"
                  readOnly
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 text-sm text-gray-500 outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Link
              href="/my-listings"
              className="flex h-12 items-center justify-center rounded-xl border border-gray-200 px-7 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-8 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              <CheckCircle size={18} />
              Update Studio
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditStudioPage;
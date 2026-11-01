import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Star,
  Clock,
  Users,
  Wifi,
  Camera,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

const studio = {
  name: "Modern Photography Studio",
  category: "Photo Studios",
  location: "Gulshan, Dhaka, Bangladesh",
  price: 45,
  rating: 4.9,
  reviews: 28,
  image:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
  description:
    "A beautiful and professional creative space designed for photographers, content creators, and creative professionals. Enjoy a comfortable environment with modern facilities for your next project.",
  features: [
    "Professional Lighting",
    "High-Speed Wi-Fi",
    "Air Conditioning",
    "Parking Available",
    "Photography Equipment",
    "Comfortable Workspace",
  ],
};

export default function StudioDetailsPage() {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/studios"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-violet-600 dark:text-gray-400"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-900">
              <div className="relative h-72 sm:h-96">
                <img
                  src={studio.image}
                  alt={studio.name}
                  className="h-full w-full object-cover"
                />

                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                  {studio.category}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                    {studio.name}
                  </h1>

                  <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-2 text-sm font-semibold text-gray-800 dark:bg-yellow-500/10 dark:text-yellow-400">
                    <Star
                      size={17}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {studio.rating}
                    <span className="font-normal text-gray-500 dark:text-gray-400">
                      ({studio.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={18} className="text-violet-500" />
                  {studio.location}
                </div>

                <div className="my-8 border-t border-gray-100 dark:border-gray-800"></div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  About This Studio
                </h2>

                <p className="mt-4 text-sm leading-8 text-gray-600 dark:text-gray-400">
                  {studio.description}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Studio Features & Amenities
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {studio.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircle
                      size={19}
                      className="shrink-0 text-violet-600"
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Studio Information
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                    <Clock className="text-violet-600" size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Flexible Hours
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Book your preferred time
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                    <Users className="text-violet-600" size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Creator Friendly
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Designed for creative teams
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                    <Wifi className="text-violet-600" size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Free Wi-Fi
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Stay connected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                    <Camera className="text-violet-600" size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Professional Setup
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Ready for your next project
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Starting from
              </p>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${studio.price}
                </span>
                <span className="pb-1 text-sm text-gray-500 dark:text-gray-400">
                  / hour
                </span>
              </div>

              <div className="my-6 border-t border-gray-100 dark:border-gray-800"></div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm text-gray-700 outline-none focus:border-violet-500 dark:border-gray-700 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Booking Hours
                  </label>
                  <select className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm text-gray-700 outline-none focus:border-violet-500 dark:border-gray-700 dark:text-gray-300">
                    <option value="">Select hours</option>
                    <option value="1">1 Hour</option>
                    <option value="2">2 Hours</option>
                    <option value="3">3 Hours</option>
                    <option value="4">4 Hours</option>
                    <option value="5">5 Hours</option>
                    <option value="6">6 Hours</option>
                  </select>
                </div>
              </div>

              <button
                disabled
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-semibold text-white opacity-70"
              >
                Book This Studio
                <ArrowUpRight size={18} />
              </button>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
                <ShieldCheck
                  size={20}
                  className="shrink-0 text-violet-600"
                />
                <p className="text-xs leading-6 text-gray-600 dark:text-gray-400">
                  Your booking is protected. Enjoy a safe and reliable
                  studio booking experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

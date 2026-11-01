import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowRight,
  X,
} from "lucide-react";

const bookings = [
  {
    id: 1,
    name: "Creative Photography Studio",
    category: "Photo Studio",
    location: "Dhaka, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85",
    date: "November 05, 2026",
    hours: "3 Hours",
    price: 120,
    status: "Pending",
  },
  {
    id: 2,
    name: "Professional Podcast Room",
    category: "Podcast Lounge",
    location: "Chattogram, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=85",
    date: "November 08, 2026",
    hours: "2 Hours",
    price: 80,
    status: "Confirmed",
  },
  {
    id: 3,
    name: "Modern Music Suite",
    category: "Music Suite",
    location: "Dhaka, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=85",
    date: "October 20, 2026",
    hours: "4 Hours",
    price: 160,
    status: "Completed",
  },
];

const MyBookingsPage = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
              MY ACTIVITY
            </p>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              My Bookings
            </h1>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Keep track of your studio reservations and booking status.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Explore Studios
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Bookings
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              3
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pending
            </p>
            <h2 className="mt-2 text-3xl font-bold text-amber-500">1</h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Confirmed
            </p>
            <h2 className="mt-2 text-3xl font-bold text-blue-500">1</h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed
            </p>
            <h2 className="mt-2 text-3xl font-bold text-green-500">1</h2>
          </div>
        </div>

        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-col md:flex-row">
                <div className="h-56 md:h-auto md:w-64">
                  <img
                    src={booking.image}
                    alt={booking.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-5 p-6">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600 dark:bg-violet-950/40">
                        {booking.category}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          booking.status === "Pending"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40"
                            : booking.status === "Confirmed"
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40"
                              : "bg-green-50 text-green-600 dark:bg-green-950/40"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {booking.name}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        {booking.location}
                      </span>

                      <span className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        {booking.date}
                      </span>

                      <span className="flex items-center gap-2">
                        <Clock3 size={16} />
                        {booking.hours}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5 dark:border-gray-800">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Total Price
                      </p>

                      <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                        ${booking.price}
                      </p>
                    </div>

                    {booking.status === "Pending" && (
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
                      >
                        <X size={16} />
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyBookingsPage;

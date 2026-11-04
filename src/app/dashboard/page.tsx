"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
ArrowRight,
CalendarDays,
Building2,
Clock3,
Plus,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

type Studio = {
_id: string;
title: string;
hostId?: string;
hostEmail?: string;
};

type Booking = {
_id: string;
status: string;
customerEmail: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const DashboardPage = () => {
const router = useRouter();

const { data: session, isPending: isSessionPending } =
authClient.useSession();

const user = session?.user;
const userId = user?.id;

const [myStudios, setMyStudios] = useState<Studio[]>([]);
const [allStudios, setAllStudios] = useState<Studio[]>([]);
const [bookings, setBookings] = useState<Booking[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
if (isSessionPending) {
return;
}


if (!userId) {
  router.replace("/login");
  return;
}

let isMounted = true;

const fetchDashboardData = async () => {
  setIsLoading(true);

  try {
    const [myStudiosResponse, allStudiosResponse, bookingsResponse] =
      await Promise.all([
        fetch(`${API_URL}/my-studios`, {
          credentials: "include",
          cache: "no-store",
        }),

        fetch(`${API_URL}/studios`, {
          credentials: "include",
          cache: "no-store",
        }),

        fetch(`${API_URL}/bookings`, {
          credentials: "include",
          cache: "no-store",
        }),
      ]);

    const myStudiosData = await myStudiosResponse.json();
    const allStudiosData = await allStudiosResponse.json();
    const bookingsData = await bookingsResponse.json();

    if (
      !myStudiosResponse.ok ||
      !allStudiosResponse.ok ||
      !bookingsResponse.ok
    ) {
      throw new Error("Failed to load dashboard information.");
    }

    if (isMounted) {
      setMyStudios(myStudiosData);
      setAllStudios(allStudiosData);
      setBookings(bookingsData);
    }
  } catch (error) {
    if (isMounted) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load dashboard information."
      );
    }
  } finally {
    if (isMounted) {
      setIsLoading(false);
    }
  }
};

fetchDashboardData();

return () => {
  isMounted = false;
};


}, [isSessionPending, userId, router]);

const pendingBookings = bookings.filter(
(booking) => booking.status.toLowerCase() === "pending"
).length;

const dashboardStats = [
{
label: "My Studios",
count: myStudios.length,
icon: Building2,
iconStyle: "bg-violet-100 text-violet-600 dark:bg-violet-950",
countStyle: "text-gray-900 dark:text-white",
},
{
label: "My Bookings",
count: bookings.length,
icon: CalendarDays,
iconStyle: "bg-blue-100 text-blue-600 dark:bg-blue-950",
countStyle: "text-gray-900 dark:text-white",
},
{
label: "Pending Bookings",
count: pendingBookings,
icon: Clock3,
iconStyle: "bg-amber-100 text-amber-600 dark:bg-amber-950",
countStyle: "text-gray-900 dark:text-white",
},
{
label: "Listed Studios",
count: allStudios.length,
icon: Building2,
iconStyle: "bg-green-100 text-green-600 dark:bg-green-950",
countStyle: "text-gray-900 dark:text-white",
},
];

if (isSessionPending || isLoading) {
return ( <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-300">
Loading your dashboard... </div>
);
}

return ( <section className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950"> <div className="mx-auto max-w-7xl"> <div className="mb-10"> <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
DASHBOARD </p>


      <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
        Welcome back, {user?.name?.split(" ")[0] || "User"}!
      </h1>

      <p className="mt-3 text-gray-500 dark:text-gray-400">
        Manage your creative spaces, bookings, and studio activities from
        one place.
      </p>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconStyle}`}
            >
              <Icon size={22} />
            </div>

            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
              {item.label}
            </p>

            <h2
              className={`mt-1 text-3xl font-bold ${item.countStyle}`}
            >
              {item.count}
            </h2>
          </div>
        );
      })}
    </div>

    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Quick Actions
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Get started with your StudioSpace activities.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/add-studio"
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-violet-300 hover:bg-violet-50 dark:border-gray-700 dark:hover:bg-violet-950/30"
          >
            <div className="flex items-center gap-3">
              <Plus size={20} className="text-violet-600" />

              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Add New Studio
              </span>
            </div>

            <ArrowRight size={17} className="text-gray-400" />
          </Link>

          <Link
            href="/studios"
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-violet-300 hover:bg-violet-50 dark:border-gray-700 dark:hover:bg-violet-950/30"
          >
            <div className="flex items-center gap-3">
              <Building2 size={20} className="text-violet-600" />

              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Explore Studios
              </span>
            </div>

            <ArrowRight size={17} className="text-gray-400" />
          </Link>

          <Link
            href="/my-listings"
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-violet-300 hover:bg-violet-50 dark:border-gray-700 dark:hover:bg-violet-950/30"
          >
            <div className="flex items-center gap-3">
              <Building2 size={20} className="text-violet-600" />

              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                My Listings
              </span>
            </div>

            <ArrowRight size={17} className="text-gray-400" />
          </Link>

          <Link
            href="/my-bookings"
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-violet-300 hover:bg-violet-50 dark:border-gray-700 dark:hover:bg-violet-950/30"
          >
            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-violet-600" />

              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                My Bookings
              </span>
            </div>

            <ArrowRight size={17} className="text-gray-400" />
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-gray-900 p-7 text-white dark:bg-gray-800">
        <p className="text-sm font-semibold tracking-widest text-violet-400">
          CREATIVE SPACE
        </p>

        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
          Ready to create something amazing?
        </h2>

        <p className="mt-4 max-w-lg text-sm leading-7 text-gray-300">
          Discover inspiring studios and professional creative spaces for
          your next project.
        </p>

        <Link
          href="/studios"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          Explore Studios
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </div>
</section>


);
};

export default DashboardPage;

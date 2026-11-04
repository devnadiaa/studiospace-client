"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Plus,
  MapPin,
  Pencil,
  Trash2,
  Building2,
  ArrowRight,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Studio {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  address: string;
  city: string;
  country: string;
  hourlyRate: number;
  hostEmail: string;
  hostId?: string;
}

interface Booking {
  _id: string;
  studioId: string;
  status: string;
}

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const MyListingsPage = () => {
  const router = useRouter();

  const { data: session, isPending: isSessionPending } =
    authClient.useSession();

  const userId = session?.user?.id;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (isSessionPending) {
      return;
    }

    if (!userId) {
      router.replace("/login?callbackURL=%2Fmy-listings");
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const [studiosResponse, bookingsResponse] = await Promise.all([
          fetch(`${API_URL}/my-studios`, {
            credentials: "include",
            cache: "no-store",
          }),
          fetch(`${API_URL}/host-bookings`, {
            credentials: "include",
            cache: "no-store",
          }),
        ]);

        const studiosData = await studiosResponse.json();
        const bookingsData = await bookingsResponse.json();

        if (studiosResponse.ok === false) {
          throw new Error(
            studiosData.message || "Failed to load studio listings.",
          );
        }

        if (bookingsResponse.ok === false) {
          throw new Error(
            bookingsData.message || "Failed to load bookings.",
          );
        }

        if (isMounted) {
          setStudios(Array.isArray(studiosData) ? studiosData : []);
          setBookings(Array.isArray(bookingsData) ? bookingsData : []);
        }
      } catch (error) {
        if (isMounted) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load dashboard data.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [isSessionPending, userId, router]);

  const handleDelete = async () => {
    if (!selectedStudio) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(
        `${API_URL}/studios/${selectedStudio._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok === false) {
        toast.error(data.message || "Failed to delete studio.");
        return;
      }

      setStudios((previousStudios) =>
        previousStudios.filter(
          (studio) => studio._id !== selectedStudio._id,
        ),
      );

      setSelectedStudio(null);
      toast.success("Studio deleted successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const activeBookings = bookings.filter((booking) => {
    const status = booking.status?.toLowerCase();

    return status !== "rejected" && status !== "cancelled";
  });

  const bookedStudioIds = new Set(
    activeBookings.map((booking) => String(booking.studioId)),
  );

  const totalListings = studios.length;

  const bookedStudios = studios.filter((studio) =>
    bookedStudioIds.has(String(studio._id)),
  ).length;

  const availableStudios = totalListings - bookedStudios;

  if (isSessionPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-300">
        Loading your listings...
      </div>
    );
  }

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
            <Building2 size={40} className="mx-auto text-gray-400" />

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
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative h-56">
                  {studio.imageUrl ? (
                    <img
                      src={studio.imageUrl}
                      alt={studio.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-100 text-sm text-gray-400 dark:bg-gray-800">
                      Studio image unavailable
                    </div>
                  )}

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
                    onClick={() => setSelectedStudio(studio)}
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

      {selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Delete Studio
              </h2>

              <button
                type="button"
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedStudio.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyListingsPage;
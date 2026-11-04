"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowRight,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

type Booking = {
  _id: string;
  studioId: string;
  customerEmail: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
};

type Studio = {
  _id: string;
  title: string;
  category: string;
  address: string;
  city: string;
  country: string;
  imageUrl: string;
};

type BookingWithStudio = Booking & {
  studio: Studio | null;
};

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<BookingWithStudio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let isFetching = false;

    const fetchBookings = async () => {
      if (isFetching) {
        return;
      }

      isFetching = true;

      try {
        const response = await fetch(`${API_URL}/bookings`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          throw new Error(
            errorData?.message || "Failed to load bookings.",
          );
        }

        const data: Booking[] = await response.json();

        const bookingsWithStudios = await Promise.all(
          data.map(async (booking) => {
            try {
              const studioResponse = await fetch(
                `${API_URL}/studios/${booking.studioId}`,
                {
                  credentials: "include",
                  cache: "no-store",
                },
              );

              if (!studioResponse.ok) {
                return {
                  ...booking,
                  studio: null,
                };
              }

              const studio: Studio = await studioResponse.json();

              return {
                ...booking,
                studio,
              };
            } catch {
              return {
                ...booking,
                studio: null,
              };
            }
          }),
        );

        if (isMounted) {
          setBookings(bookingsWithStudios);
        }
      } catch (error) {
        if (isMounted) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load bookings.",
          );
        }
      } finally {
        isFetching = false;

        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBookings();

    const intervalId = setInterval(() => {
      fetchBookings();
    }, 10000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchBookings();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(intervalId);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);

    try {
      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to cancel booking.");
        return;
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: "Cancelled",
              }
            : booking,
        ),
      );

      toast.success("Booking cancelled successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  const getBookingHours = (startTime: string, endTime: string) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    const hours = (end - start) / 60;

    return `${hours} ${hours === 1 ? "Hour" : "Hours"}`;
  };

  const formatBookingDate = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-600 dark:bg-amber-950/40";

      case "confirmed":
        return "bg-blue-50 text-blue-600 dark:bg-blue-950/40";

      case "completed":
        return "bg-green-50 text-green-600 dark:bg-green-950/40";

      case "cancelled":
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";

      case "rejected":
        return "bg-red-50 text-red-600 dark:bg-red-950/40";

      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const pendingCount = bookings.filter(
    (booking) => booking.status.toLowerCase() === "pending",
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status.toLowerCase() === "confirmed",
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status.toLowerCase() === "completed",
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status.toLowerCase() === "cancelled",
  ).length;

  const rejectedCount = bookings.filter(
    (booking) => booking.status.toLowerCase() === "rejected",
  ).length;

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

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            {
              label: "Total Bookings",
              count: bookings.length,
              color: "text-gray-900 dark:text-white",
            },
            {
              label: "Pending",
              count: pendingCount,
              color: "text-amber-500",
            },
            {
              label: "Confirmed",
              count: confirmedCount,
              color: "text-blue-500",
            },
            {
              label: "Completed",
              count: completedCount,
              color: "text-green-500",
            },
            {
              label: "Cancelled",
              count: cancelledCount,
              color: "text-gray-500",
            },
            {
              label: "Rejected",
              count: rejectedCount,
              color: "text-red-500",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </p>

              <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>
                {isLoading ? "—" : item.count}
              </h2>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900">
            <CalendarDays size={42} className="mx-auto text-violet-500" />

            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
              No Bookings Yet
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              You haven&apos;t booked any creative spaces yet.
            </p>

            <Link
              href="/studios"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Explore Studios
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="h-56 md:h-auto md:w-64">
                    {booking.studio?.imageUrl ? (
                      <img
                        src={booking.studio.imageUrl}
                        alt={booking.studio.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-56 items-center justify-center bg-gray-100 text-sm text-gray-400 dark:bg-gray-800">
                        Studio image unavailable
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-5 p-6">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600 dark:bg-violet-950/40">
                          {booking.studio?.category || "Studio"}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {booking.studio?.title || "Studio Unavailable"}
                      </h2>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-2">
                          <MapPin size={16} />

                          {booking.studio
                            ? `${booking.studio.address}, ${booking.studio.city}, ${booking.studio.country}`
                            : "Location unavailable"}
                        </span>

                        <span className="flex items-center gap-2">
                          <CalendarDays size={16} />

                          {formatBookingDate(booking.bookingDate)}
                        </span>

                        <span className="flex items-center gap-2">
                          <Clock3 size={16} />

                          {getBookingHours(
                            booking.startTime,
                            booking.endTime,
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5 dark:border-gray-800">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Total Price
                        </p>

                        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                          ${booking.totalPrice}
                        </p>
                      </div>

                      {booking.status.toLowerCase() === "pending" && (
                        <button
                          type="button"
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:hover:bg-red-950/30"
                        >
                          <X size={16} />

                          {cancellingId === booking._id
                            ? "Cancelling..."
                            : "Cancel Booking"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBookingsPage;

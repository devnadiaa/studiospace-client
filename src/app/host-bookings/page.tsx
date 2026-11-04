"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  CheckCircle2,
  XCircle,
  ImageIcon,
  LoaderCircle,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Studio = {
  _id: string;
  title?: string;
  name?: string;
  imageUrl?: string;
  coverImage?: string;
  image?: string;
  thumbnail?: string;
  images?: string[];
  address?: string;
  city?: string;
};

type Booking = {
  _id: string;
  studioId: string | { _id?: string };
  customerName?: string;
  customerEmail?: string;
  userName?: string;
  userEmail?: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
};

type BookingWithStudio = Booking & {
  studio: Studio | null;
};

type BookingAction = "confirm" | "reject" | "complete";

const HostBookingsPage = () => {
  const [bookings, setBookings] = useState<BookingWithStudio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const getArray = (data: unknown): Record<string, unknown>[] => {
    if (Array.isArray(data)) {
      return data as Record<string, unknown>[];
    }

    if (data && typeof data === "object") {
      const result = data as Record<string, unknown>;

      if (Array.isArray(result.bookings)) {
        return result.bookings as Record<string, unknown>[];
      }

      if (Array.isArray(result.studios)) {
        return result.studios as Record<string, unknown>[];
      }

      if (Array.isArray(result.data)) {
        return result.data as Record<string, unknown>[];
      }
    }

    return [];
  };

  const getStudioId = (booking: Booking) => {
    if (typeof booking.studioId === "object") {
      return String(booking.studioId?._id || "");
    }

    return String(booking.studioId || "");
  };

  const getStudioName = (booking: BookingWithStudio) => {
    return (
      booking.studio?.title ||
      booking.studio?.name ||
      "Studio information unavailable"
    );
  };

  const getStudioImage = (booking: BookingWithStudio) => {
    const studio = booking.studio;

    if (!studio) {
      return "";
    }

    return (
      studio.imageUrl ||
      studio.coverImage ||
      studio.image ||
      studio.thumbnail ||
      studio.images?.[0] ||
      ""
    );
  };

  const getCustomerName = (booking: Booking) => {
    return (
      booking.customerName ||
      booking.userName ||
      "Customer"
    );
  };

  const getCustomerEmail = (booking: Booking) => {
    return (
      booking.customerEmail ||
      booking.userEmail ||
      "Email unavailable"
    );
  };

  const fetchBookings = async () => {
    setIsLoading(true);

    try {
      const [bookingResponse, studioResponse] = await Promise.all([
        fetch(`${API_URL}/host-bookings`, {
          credentials: "include",
          cache: "no-store",
        }),
        fetch(`${API_URL}/my-studios`, {
          credentials: "include",
          cache: "no-store",
        }),
      ]);

      if (bookingResponse.ok === false) {
        throw new Error("Failed to load booking requests");
      }

      const bookingData = await bookingResponse.json();

      const bookingList = getArray(bookingData) as unknown as Booking[];

      let studioList: Studio[] = [];

      if (studioResponse.ok) {
        const studioData = await studioResponse.json();

        studioList = getArray(studioData) as unknown as Studio[];
      }

      const bookingsWithStudios: BookingWithStudio[] =
        bookingList.map((booking) => {
          const studioId = getStudioId(booking);

          const studio =
            studioList.find(
              (item) => String(item._id) === studioId,
            ) || null;

          return {
            ...booking,
            studio,
          };
        });

      setBookings(bookingsWithStudios);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load booking requests",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBookingAction = async (
    bookingId: string,
    action: BookingAction,
  ) => {
    setProcessingId(bookingId);

    try {
      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/${action}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok === false) {
        throw new Error(data.message || "Action failed");
      }

      const updatedStatus =
        action === "confirm"
          ? "Confirmed"
          : action === "reject"
            ? "Rejected"
            : "Completed";

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: updatedStatus,
              }
            : booking,
        ),
      );

      if (action === "confirm") {
        toast.success("Booking confirmed successfully!");
      } else if (action === "reject") {
        toast.success("Booking rejected successfully!");
      } else {
        toast.success("Booking completed successfully!");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const normalizedStatus = (status: string) =>
    status?.toLowerCase() || "pending";

  const statusStyle = (status: string) => {
    const value = normalizedStatus(status);

    if (value === "confirmed") {
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300";
    }

    if (value === "completed") {
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300";
    }

    if (value === "rejected") {
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300";
    }

    if (value === "cancelled") {
      return "border-gray-200 bg-gray-100 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }

    return "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-300";
  };

  const filteredBookings = useMemo(() => {
    if (activeFilter === "All") {
      return bookings;
    }

    return bookings.filter(
      (booking) =>
        normalizedStatus(booking.status) ===
        activeFilter.toLowerCase(),
    );
  }, [bookings, activeFilter]);

  const pendingCount = bookings.filter(
    (booking) =>
      normalizedStatus(booking.status) === "pending",
  ).length;

  const confirmedCount = bookings.filter(
    (booking) =>
      normalizedStatus(booking.status) === "confirmed",
  ).length;

  const completedCount = bookings.filter(
    (booking) =>
      normalizedStatus(booking.status) === "completed",
  ).length;

  const totalEarnings = bookings
    .filter(
      (booking) =>
        ["confirmed", "completed"].includes(
          normalizedStatus(booking.status),
        ),
    )
    .reduce(
      (total, booking) => total + Number(booking.totalPrice || 0),
      0,
    );

  const filters = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Rejected",
    "Cancelled",
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Host Dashboard
            </p>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Booking Requests
            </h1>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Manage your studio reservations and booking requests.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-violet-500 dark:hover:text-violet-400"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Bookings
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              {bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Pending Requests
            </p>

            <p className="mt-3 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Confirmed Bookings
            </p>

            <p className="mt-3 text-3xl font-bold text-blue-600 dark:text-blue-400">
              {confirmedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Completed Bookings
            </p>

            <p className="mt-3 text-3xl font-bold text-green-600 dark:text-green-400">
              {completedCount}
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Confirmed & Completed Booking Value
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            ${totalEarnings.toFixed(2)}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "bg-violet-600 text-white shadow-md"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-violet-500 dark:hover:text-violet-400"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex min-h-72 items-center justify-center rounded-2xl bg-white dark:bg-gray-900">
            <div className="text-center">
              <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-violet-600 dark:text-violet-400" />

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Loading booking requests...
              </p>
            </div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-20 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <CalendarDays className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />

            <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
              No Booking Requests Found
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              There are no {activeFilter.toLowerCase()} bookings to display.
            </p>

            {activeFilter !== "All" && (
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                View All Bookings
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {filteredBookings.map((booking) => {
              const studioImage = getStudioImage(booking);

              const status = normalizedStatus(booking.status);

              const isProcessing =
                processingId === booking._id;

              return (
                <article
                  key={booking._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/20"
                >
                  <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-[220px_1fr] md:p-6">
                    <div className="relative h-48 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 md:h-full md:min-h-48">
                      {studioImage ? (
                        <img
                          src={studioImage}
                          alt={getStudioName(booking)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full min-h-48 flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                          <ImageIcon className="h-10 w-10" />

                          <span className="mt-2 text-xs">
                            Studio image unavailable
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {getStudioName(booking)}
                          </h2>

                          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                            Booking ID: {booking._id.slice(-8)}
                          </p>
                        </div>

                        <span
                          className={`rounded-full border px-4 py-1.5 text-xs font-bold capitalize ${statusStyle(
                            booking.status,
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                            Customer
                          </p>

                          <p className="mt-1 font-semibold text-gray-800 dark:text-gray-200">
                            {getCustomerName(booking)}
                          </p>

                          <p className="mt-1 break-all text-sm text-gray-500 dark:text-gray-400">
                            {getCustomerEmail(booking)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                            Booking Date
                          </p>

                          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <CalendarDays className="h-4 w-4 text-violet-500 dark:text-violet-400" />

                            {new Date(
                              `${booking.bookingDate}T00:00:00`,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                            Booking Time
                          </p>

                          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <Clock3 className="h-4 w-4 text-violet-500 dark:text-violet-400" />

                            {booking.startTime} - {booking.endTime}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                            Studio Location
                          </p>

                          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <MapPin className="h-4 w-4 text-violet-500 dark:text-violet-400" />

                            {[
                              booking.studio?.address,
                              booking.studio?.city,
                            ]
                              .filter(Boolean)
                              .join(", ") || "Location unavailable"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5 dark:border-gray-800">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                            Total Price
                          </p>

                          <p className="mt-1 text-2xl font-bold text-violet-600 dark:text-violet-400">
                            ${Number(booking.totalPrice || 0).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleBookingAction(
                                    booking._id,
                                    "confirm",
                                  )
                                }
                                disabled={isProcessing}
                                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isProcessing ? (
                                  <LoaderCircle className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4" />
                                )}

                                Confirm
                              </button>

                              <button
                                onClick={() =>
                                  handleBookingAction(
                                    booking._id,
                                    "reject",
                                  )
                                }
                                disabled={isProcessing}
                                className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                              >
                                <XCircle className="h-4 w-4" />

                                Reject
                              </button>
                            </>
                          )}

                          {status === "confirmed" && (
                            <button
                              onClick={() =>
                                handleBookingAction(
                                  booking._id,
                                  "complete",
                                )
                              }
                              disabled={isProcessing}
                              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isProcessing ? (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4" />
                              )}

                              Mark as Completed
                            </button>
                          )}

                          {status === "completed" && (
                            <span className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">
                              <CheckCircle2 className="h-4 w-4" />

                              Booking Completed
                            </span>
                          )}

                          {status === "rejected" && (
                            <span className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 dark:bg-red-950 dark:text-red-300">
                              <XCircle className="h-4 w-4" />

                              Booking Rejected
                            </span>
                          )}

                          {status === "cancelled" && (
                            <span className="rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                              Booking Cancelled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default HostBookingsPage;
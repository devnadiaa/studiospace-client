"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  Clock3,
  LoaderCircle,
  MapPin,
  RefreshCw,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Booking = {
  _id?: string;
  id?: string;
  studioId?: string;
  studioName?: string;
  customerName?: string;
  customerEmail?: string;
  bookingDate?: string;
  date?: string;
  startTime?: string;
  bookingTime?: string;
  time?: string;
  duration?: number;
  hours?: number;
  totalPrice?: number;
  status?: string;
  createdAt?: string;
  location?: string;
  studio?: {
    name?: string;
    title?: string;
    location?: string;
  };
  [key: string]: unknown;
};

type Studio = {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  studioName?: string;
  location?: string;
  [key: string]: unknown;
};

type BookingAction = {
  id: string;
  type: "confirm" | "reject";
};

const getArray = (data: unknown): Booking[] => {
  if (Array.isArray(data)) {
    return data as Booking[];
  }

  if (data && typeof data === "object") {
    const result = data as Record<string, unknown>;

    if (Array.isArray(result.bookings)) {
      return result.bookings as Booking[];
    }

    if (Array.isArray(result.data)) {
      return result.data as Booking[];
    }

    if (Array.isArray(result.studios)) {
      return result.studios as Booking[];
    }
  }

  return [];
};

const getId = (booking: Booking) => {
  return String(booking._id || booking.id || "");
};

const getStatus = (booking: Booking) => {
  return String(booking.status || "Pending").toLowerCase();
};

const getStudioTitle = (booking: Booking, studios: Studio[]) => {
  const directName =
    booking.studioName ||
    booking.studio?.name ||
    booking.studio?.title;

  if (directName) {
    return String(directName);
  }

  const studio = studios.find((item) => {
    const studioId = String(item._id || item.id || "");
    return studioId === String(booking.studioId || "");
  });

  return String(
    studio?.name ||
      studio?.title ||
      studio?.studioName ||
      "Studio"
  );
};

const formatDate = (value?: string) => {
  if (!value) {
    return "Date not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatPrice = (value?: number) => {
  if (typeof value !== "number") {
    return "Not available";
  }

  return `$${value.toLocaleString("en-US")}`;
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "rejected":
      return "bg-rose-50 text-rose-700 border-rose-200";

    case "cancelled":
      return "bg-gray-100 text-gray-600 border-gray-200";

    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "confirmed":
      return "Confirmed";

    case "rejected":
      return "Rejected";

    case "cancelled":
      return "Cancelled";

    default:
      return "Pending";
  }
};

const HostBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [action, setAction] = useState<BookingAction | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [error, setError] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const fetchBookings = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");
    setUnauthorized(false);

    try {
      const [bookingResponse, studioResponse] = await Promise.all([
        fetch(`${API_URL}/host-bookings`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }),
        fetch(`${API_URL}/my-studios`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }).catch(() => null),
      ]);

      if (bookingResponse.status === 401) {
        setUnauthorized(true);
        setBookings([]);
        return;
      }

      if (!bookingResponse.ok) {
        const result = await bookingResponse.json().catch(() => ({}));
        throw new Error(
          result.message || "Unable to load booking requests."
        );
      }

      const bookingData = await bookingResponse.json();
      setBookings(getArray(bookingData));

      if (studioResponse?.ok) {
        const studioData = await studioResponse.json();
        setStudios(getArray(studioData) as Studio[]);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      setError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    if (activeFilter === "all") {
      return bookings;
    }

    return bookings.filter(
      (booking) => getStatus(booking) === activeFilter
    );
  }, [bookings, activeFilter]);

  const counts = useMemo(
    () => ({
      all: bookings.length,
      pending: bookings.filter(
        (booking) => getStatus(booking) === "pending"
      ).length,
      confirmed: bookings.filter(
        (booking) => getStatus(booking) === "confirmed"
      ).length,
      rejected: bookings.filter(
        (booking) => getStatus(booking) === "rejected"
      ).length,
    }),
    [bookings]
  );

  const handleBookingAction = async (
    bookingId: string,
    type: "confirm" | "reject"
  ) => {
    setAction({ id: bookingId, type });

    try {
      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/${type}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Unable to ${type} this booking.`
        );
      }

      showToast(
        type === "confirm"
          ? "Booking confirmed successfully."
          : "Booking rejected successfully."
      );

      await fetchBookings(true);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      showToast(message);
    } finally {
      setAction(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
      {toast && (
        <div
          role="status"
          className="fixed right-4 top-5 z-50 flex max-w-sm items-center gap-3 rounded-xl bg-gray-900 px-5 py-4 text-sm text-white shadow-xl"
        >
          <Check size={18} className="shrink-0 text-emerald-400" />
          <span>{toast}</span>
          <button
            type="button"
            onClick={() => setToast("")}
            className="ml-auto"
            aria-label="Close notification"
          >
            <X size={17} />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
              Host Dashboard
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Booking Requests
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Manage and review booking requests for your studios.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchBookings(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {unauthorized ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <UserRound
              size={38}
              className="mx-auto mb-4 text-violet-500"
            />

            <h2 className="text-xl font-bold">
              Login Required
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Please log in to view and manage your studio booking requests.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Go to Login
            </Link>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-white px-6 py-12 text-center">
            <XCircle
              size={36}
              className="mx-auto mb-3 text-rose-500"
            />

            <h2 className="text-lg font-bold">
              Could not load booking requests
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => fetchBookings()}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                {
                  label: "Total Requests",
                  value: counts.all,
                  icon: CalendarDays,
                  color: "text-violet-600",
                  bg: "bg-violet-50",
                },
                {
                  label: "Pending",
                  value: counts.pending,
                  icon: Clock3,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
                {
                  label: "Confirmed",
                  value: counts.confirmed,
                  icon: Check,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
                {
                  label: "Rejected",
                  value: counts.rejected,
                  icon: XCircle,
                  color: "text-rose-600",
                  bg: "bg-rose-50",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div
                      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                    >
                      <Icon size={20} />
                    </div>

                    <p className="text-sm text-gray-500">
                      {item.label}
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {[
                { value: "all", label: "All Requests" },
                { value: "pending", label: "Pending" },
                { value: "confirmed", label: "Confirmed" },
                { value: "rejected", label: "Rejected" },
                { value: "cancelled", label: "Cancelled" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeFilter === filter.value
                      ? "bg-violet-600 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex min-h-64 items-center justify-center">
                <LoaderCircle
                  size={34}
                  className="animate-spin text-violet-600"
                />
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                <CalendarDays
                  size={40}
                  className="mx-auto mb-4 text-gray-300"
                />

                <h2 className="text-xl font-bold">
                  No booking requests found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {activeFilter === "all"
                    ? "Booking requests for your studios will appear here."
                    : `There are no ${activeFilter} booking requests.`}
                </p>
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {filteredBookings.map((booking) => {
                  const bookingId = getId(booking);
                  const status = getStatus(booking);
                  const isBusy = action?.id === bookingId;
                  const studioTitle = getStudioTitle(
                    booking,
                    studios
                  );

                  const customerName = String(
                    booking.customerName ||
                      booking.name ||
                      "Guest"
                  );

                  const customerEmail = String(
                    booking.customerEmail ||
                      booking.email ||
                      "Email not available"
                  );

                  const bookingDate = String(
                    booking.bookingDate || booking.date || ""
                  );

                  const bookingTime = String(
                    booking.startTime ||
                      booking.bookingTime ||
                      booking.time ||
                      "Not specified"
                  );

                  const duration = Number(
                    booking.duration || booking.hours || 0
                  );

                  return (
                    <article
                      key={bookingId}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-violet-600">
                            Studio Booking
                          </p>

                          <h2 className="text-lg font-bold">
                            {studioTitle}
                          </h2>

                          <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                            <UserRound size={15} />
                            {customerName}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {customerEmail}
                          </p>
                        </div>

                        <span
                          className={`w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(status)}`}
                        >
                          {getStatusLabel(status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 p-5">
                        <div>
                          <p className="mb-1 text-xs text-gray-400">
                            Booking Date
                          </p>

                          <p className="flex items-center gap-2 text-sm font-semibold">
                            <CalendarDays
                              size={16}
                              className="text-violet-500"
                            />
                            {formatDate(bookingDate)}
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-xs text-gray-400">
                            Start Time
                          </p>

                          <p className="flex items-center gap-2 text-sm font-semibold">
                            <Clock3
                              size={16}
                              className="text-violet-500"
                            />
                            {bookingTime}
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-xs text-gray-400">
                            Duration
                          </p>

                          <p className="text-sm font-semibold">
                            {duration > 0
                              ? `${duration} hours`
                              : "Not specified"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-xs text-gray-400">
                            Total Amount
                          </p>

                          <p className="text-sm font-bold text-violet-700">
                            {formatPrice(booking.totalPrice)}
                          </p>
                        </div>

                        {(booking.location ||
                          booking.studio?.location) && (
                          <div className="col-span-2">
                            <p className="mb-1 text-xs text-gray-400">
                              Location
                            </p>

                            <p className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin
                                size={15}
                                className="text-violet-500"
                              />
                              {String(
                                booking.location ||
                                  booking.studio?.location
                              )}
                            </p>
                          </div>
                        )}
                      </div>

                      {status === "pending" && (
                        <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 p-5 sm:flex-row">
                          <button
                            type="button"
                            onClick={() =>
                              handleBookingAction(
                                bookingId,
                                "confirm"
                              )
                            }
                            disabled={Boolean(action)}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isBusy &&
                            action?.type === "confirm" ? (
                              <LoaderCircle
                                size={17}
                                className="animate-spin"
                              />
                            ) : (
                              <Check size={17} />
                            )}
                            Confirm Booking
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleBookingAction(
                                bookingId,
                                "reject"
                              )
                            }
                            disabled={Boolean(action)}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isBusy &&
                            action?.type === "reject" ? (
                              <LoaderCircle
                                size={17}
                                className="animate-spin"
                              />
                            ) : (
                              <XCircle size={17} />
                            )}
                            Reject Booking
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default HostBookingsPage;

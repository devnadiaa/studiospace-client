"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Users,
  Wifi,
  Camera,
  CheckCircle,
  ShieldCheck,
  Mail,
  User,
  Send,
  MessageSquare,
} from "lucide-react";
import { toast } from "react-toastify";
import BookingModal from "@/components/studios/BookingModal";
import StudioGallery from "@/components/studios/StudioGallery";

interface Studio {
  _id: string;
  title: string;
  category: string;
  address: string;
  city: string;
  country: string;
  hourlyRate: number;
  securityDeposit: number;
  capacity: number;
  rating?: number;
  reviewCount?: number;
  imageUrl: string;
  images?: string[];
  overview: string;
  amenities: string[];
  hostName: string;
  hostEmail: string;
}

interface Booking {
  _id: string;
  studioId: string;
  status: string;
}

interface Review {
  _id: string;
  studioId: string;
  bookingId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const API_URL = "http://localhost:5000";

const StudioDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState("");

  useEffect(() => {
    const fetchStudioData = async () => {
      try {
        const [studioResponse, reviewsResponse, bookingsResponse] =
          await Promise.all([
            fetch(`${API_URL}/studios/${id}`, {
              cache: "no-store",
            }),
            fetch(`${API_URL}/studios/${id}/reviews`, {
              cache: "no-store",
            }),
            fetch(`${API_URL}/bookings`, {
              credentials: "include",
              cache: "no-store",
            }),
          ]);

        if (studioResponse.ok) {
          const studioData = await studioResponse.json();
          setStudio(studioData);
        }

        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData);
        }

        if (bookingsResponse.ok) {
          const bookingsData: Booking[] = await bookingsResponse.json();

          setBookings(bookingsData);
          setIsLoggedIn(true);
        }
      } catch {
        toast.error("Failed to load studio information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudioData();
  }, [id]);

  const completedBookings = bookings.filter(
    (booking) =>
      booking.studioId === id &&
      booking.status.toLowerCase() === "completed",
  );

  const availableBookings = completedBookings;

  useEffect(() => {
    if (availableBookings.length > 0 && !selectedBookingId) {
      setSelectedBookingId(availableBookings[0]._id);
    }
  }, [availableBookings, selectedBookingId]);

  const handleReviewSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (selectedRating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Review must contain at least 10 characters");
      return;
    }

    if (!selectedBookingId) {
      toast.error("No eligible completed booking found");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/studios/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            bookingId: selectedBookingId,
            rating: selectedRating,
            comment: comment.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to submit review");
        return;
      }

      const reviewsResponse = await fetch(
        `${API_URL}/studios/${id}/reviews`,
        {
          cache: "no-store",
        },
      );

      if (reviewsResponse.ok) {
        const updatedReviews = await reviewsResponse.json();
        setReviews(updatedReviews);
      }

      setStudio((previousStudio) => {
        if (!previousStudio) {
          return previousStudio;
        }

        return {
          ...previousStudio,
          rating: data.rating,
          reviewCount: data.reviewCount,
        };
      });

      setSelectedRating(0);
      setComment("");

      toast.success("Your review has been submitted successfully");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </main>
    );
  }

  if (!studio) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Studio Not Found
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            This studio may have been removed or is unavailable.
          </p>

          <Link
            href="/studios"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            <ArrowLeft size={18} />
            Explore Studios
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/studios"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-violet-600 dark:text-gray-400"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <section>
              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                    {studio.category}
                  </span>

                  <h1 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                    {studio.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {studio.address}, {studio.city}, {studio.country}
                    </span>

                    <span className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                      {studio.reviewCount ? studio.rating : "New"} (
                      {studio.reviewCount ?? 0} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <StudioGallery
                imageUrl={studio.imageUrl}
                images={studio.images}
                title={studio.title}
              />
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                About This Studio
              </h2>

              <p className="mt-4 whitespace-pre-line leading-8 text-gray-600 dark:text-gray-400">
                {studio.overview}
              </p>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                  <CheckCircle
                    size={22}
                    className="text-violet-600"
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Amenities & Facilities
                </h2>
              </div>

              {studio.amenities?.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {studio.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 text-sm font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300"
                    >
                      <CheckCircle
                        size={18}
                        className="shrink-0 text-violet-600"
                      />
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No amenities information available.
                </p>
              )}
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Studio Information
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                    <Clock className="text-violet-600" size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Booking Hours
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Flexible Hours
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                    <Users className="text-violet-600" size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Maximum Capacity
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {studio.capacity} People
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                    <ShieldCheck
                      className="text-violet-600"
                      size={22}
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Security Deposit
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${studio.securityDeposit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                    <Camera className="text-violet-600" size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Studio Category
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {studio.category}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Hosted By
              </h2>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/10">
                  <User size={30} className="text-violet-600" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {studio.hostName || "Studio Host"}
                  </h3>

                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Mail size={16} />
                    {studio.hostEmail || "Contact information unavailable"}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Reviews & Ratings
                </h2>

                <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                  {reviews.length} Reviews
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-gray-50 p-5 dark:bg-gray-800">
                <div>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {reviews.length > 0
                      ? studio.rating?.toFixed(1)
                      : "New"}
                  </p>

                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={
                          star <= Math.round(studio.rating ?? 0)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 dark:text-gray-600"
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="border-l border-gray-200 pl-4 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Overall Rating
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Based on {reviews.length} customer reviews
                  </p>
                </div>
              </div>

              {isLoggedIn && availableBookings.length > 0 && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="mt-8 rounded-2xl border border-violet-100 bg-violet-50/50 p-5 dark:border-violet-500/20 dark:bg-violet-500/5"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <MessageSquare
                      size={22}
                      className="text-violet-600"
                    />

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Share Your Experience
                    </h3>
                  </div>

                  {availableBookings.length > 1 && (
                    <div className="mb-5">
                      <label
                        htmlFor="booking"
                        className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                      >
                        Select Completed Booking
                      </label>

                      <select
                        id="booking"
                        value={selectedBookingId}
                        onChange={(event) =>
                          setSelectedBookingId(event.target.value)
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-violet-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                      >
                        {availableBookings.map((booking) => (
                          <option key={booking._id} value={booking._id}>
                            Booking #{booking._id.slice(-6)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-5">
                    <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Your Rating
                    </p>

                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setSelectedRating(star)}
                          aria-label={`Rate ${star} out of 5 stars`}
                          className="transition hover:scale-110"
                        >
                          <Star
                            size={30}
                            className={
                              star <= selectedRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300 dark:text-gray-600"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="review"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Your Review
                    </label>

                    <textarea
                      id="review"
                      rows={4}
                      maxLength={1000}
                      minLength={10}
                      required
                      value={comment}
                      onChange={(event) =>
                        setComment(event.target.value)
                      }
                      placeholder="Share your experience with this studio..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-violet-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                    />

                    <p className="mt-2 text-right text-xs text-gray-500 dark:text-gray-400">
                      {comment.length}/1000 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || selectedBookingId === ""}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send size={16} />
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}

              {!isLoggedIn && (
                <div className="mt-8 rounded-2xl bg-gray-50 p-5 text-center dark:bg-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please login and complete a booking to share your review.
                  </p>

                  <Link
                    href="/login"
                    className="mt-4 inline-flex rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                  >
                    Login to Review
                  </Link>
                </div>
              )}

              {isLoggedIn && completedBookings.length === 0 && (
                <div className="mt-8 rounded-2xl bg-gray-50 p-5 text-center dark:bg-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You can share your experience after completing a booking at this studio.
                  </p>
                </div>
              )}

              <div className="mt-8 space-y-5">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <article
                      key={review._id}
                      className="rounded-2xl border border-gray-100 p-5 dark:border-gray-800"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/10">
                            <User
                              size={21}
                              className="text-violet-600"
                            />
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {review.userName || "Studio Guest"}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {new Date(
                                review.createdAt,
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={
                                star <= review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                        {review.comment}
                      </p>
                    </article>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center dark:border-gray-700">
                    <MessageSquare
                      size={32}
                      className="mx-auto text-gray-400"
                    />

                    <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
                      No Reviews Yet
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Be the first to share your experience with this studio.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-100 pb-6 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hourly Rate
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-violet-600">
                    ${studio.hourlyRate}
                  </span>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    / hour
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Security Deposit
                  </span>

                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${studio.securityDeposit}
                  </span>
                </div>
              </div>

              <div className="py-6">
                <h3 className="mb-4 font-bold text-gray-900 dark:text-white">
                  Booking Information
                </h3>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <Clock size={17} />
                    Flexible booking hours
                  </p>

                  <p className="flex items-center gap-2">
                    <Users size={17} />
                    Up to {studio.capacity} people
                  </p>

                  <p className="flex items-center gap-2">
                    <Wifi size={17} />
                    Check available facilities
                  </p>
                </div>
              </div>

              <BookingModal
                studioId={studio._id}
                studioTitle={studio.title}
                hourlyRate={studio.hourlyRate}
                securityDeposit={studio.securityDeposit}
              />

              <div className="mt-5 flex gap-3 rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
                <ShieldCheck
                  size={20}
                  className="shrink-0 text-violet-600"
                />

                <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">
                  Book securely through StudioSpace. Check your booking
                  details before confirming your reservation.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default StudioDetailsPage;
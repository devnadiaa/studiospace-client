"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  X,
  CalendarDays,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

type BookingModalProps = {
  studioId: string;
  hourlyRate: number;
};

type AvailabilityStatus =
  | "idle"
  | "checking"
  | "available"
  | "booked"
  | "error";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const BookingModal = ({
  studioId,
  hourlyRate,
}: BookingModalProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [hours, setHours] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [availability, setAvailability] =
    useState<AvailabilityStatus>("idle");

  const [availabilityMessage, setAvailabilityMessage] =
    useState("");

  const getEndTime = () => {
    if (!startTime || !hours) {
      return "";
    }

    const [hour, minute] = startTime.split(":").map(Number);

    if (
      Number.isNaN(hour) ||
      Number.isNaN(minute)
    ) {
      return "";
    }

    const totalMinutes =
      hour * 60 + minute + Number(hours) * 60;

    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;

    if (endHour >= 24) {
      return "";
    }

    return `${String(endHour).padStart(2, "0")}:${String(
      endMinute
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (
      !isOpen ||
      !bookingDate ||
      !startTime ||
      !hours
    ) {
      setAvailability("idle");
      setAvailabilityMessage("");
      return;
    }

    const endTime = getEndTime();

    if (!endTime) {
      setAvailability("idle");
      setAvailabilityMessage(
        "Please select a valid booking time."
      );
      return;
    }

    const controller = new AbortController();

    setAvailability("checking");
    setAvailabilityMessage("");

    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          studioId,
          bookingDate,
          startTime,
          endTime,
        });

        const response = await fetch(
          `${API_URL}/bookings/availability?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to check availability."
          );
        }

        if (data.available === false) {
          setAvailability("booked");
          setAvailabilityMessage(
            data.message ||
              "This time slot is already booked. Please select another time."
          );
        } else {
          setAvailability("available");
          setAvailabilityMessage(
            "This time slot is available."
          );
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setAvailability("error");
        setAvailabilityMessage(
          error instanceof Error
            ? error.message
            : "Unable to check availability."
        );
      }
    }, 350);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [isOpen, studioId, bookingDate, startTime, hours]);

  const handleOpenModal = () => {
    if (isPending) {
      return;
    }

    if (!user) {
      toast.info("Please login to book a studio.");
      router.push("/login");
      return;
    }

    setIsOpen(true);
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login to book a studio.");
      router.push("/login");
      return;
    }

    if (!bookingDate || !startTime || !hours) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (availability === "booked") {
      toast.error("This time slot is already booked.");
      return;
    }

    const endTime = getEndTime();

    if (!endTime || startTime >= endTime) {
      toast.error("Please select a valid booking time.");
      return;
    }

    const totalPrice = hourlyRate * Number(hours);

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studioId,
          bookingDate,
          startTime,
          endTime,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setAvailability("booked");
          setAvailabilityMessage(
            data.message ||
              "This time slot is already booked. Please select another time."
          );
        }

        toast.error(data.message || "Booking failed.");
        return;
      }

      toast.success("Booking request submitted successfully!");

      setIsOpen(false);
      setBookingDate("");
      setStartTime("");
      setHours("");
      setAvailability("idle");
      setAvailabilityMessage("");

      router.refresh();
    } catch {
      toast.error(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isAlreadyBooked = availability === "booked";

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        disabled={isPending}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Book This Studio
        <ArrowUpRight size={18} />
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div className="relative my-auto max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-xl dark:bg-gray-900 sm:p-8">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="absolute right-5 top-5 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
                aria-label="Close booking modal"
              >
                <X size={20} />
              </button>

              <h2 className="pr-10 text-2xl font-bold text-gray-900 dark:text-white">
                Book Your Studio
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Select your preferred date and time.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Booking Account
                  </label>

                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <CalendarDays
                      size={17}
                      className="text-violet-600"
                    />
                    Select Date
                  </label>

                  <input
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={bookingDate}
                    onChange={(event) =>
                      setBookingDate(event.target.value)
                    }
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Clock
                      size={17}
                      className="text-violet-600"
                    />
                    Start Time
                  </label>

                  <input
                    type="time"
                    value={startTime}
                    onChange={(event) =>
                      setStartTime(event.target.value)
                    }
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Booking Hours
                  </label>

                  <select
                    value={hours}
                    onChange={(event) =>
                      setHours(event.target.value)
                    }
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                  >
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

              {availability === "checking" && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <LoaderCircle
                    size={18}
                    className="animate-spin text-violet-600"
                  />
                  Checking availability...
                </div>
              )}

              {availability === "available" && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <CheckCircle2 size={19} />
                  {availabilityMessage}
                </div>
              )}

              {availability === "booked" && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
                  <AlertCircle size={19} className="shrink-0" />
                  {availabilityMessage}
                </div>
              )}

              {availability === "error" && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                  <AlertCircle size={19} className="shrink-0" />
                  {availabilityMessage}
                </div>
              )}

              <div className="mt-6 rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Hourly Rate</span>
                  <span>${hourlyRate}</span>
                </div>

                <div className="mt-3 flex items-center justify-between font-bold text-gray-900 dark:text-white">
                  <span>Total Price</span>
                  <span>
                    ${hours === "" ? 0 : hourlyRate * Number(hours)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBooking}
                disabled={
                  isLoading ||
                  availability === "checking" ||
                  isAlreadyBooked
                }
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Submitting...
                  </>
                ) : isAlreadyBooked ? (
                  "Already Booked"
                ) : availability === "checking" ? (
                  "Checking Availability..."
                ) : (
                  <>
                    Confirm Booking
                    <ArrowUpRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default BookingModal;
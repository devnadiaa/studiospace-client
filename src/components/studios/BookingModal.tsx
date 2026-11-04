"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  X,
  CalendarDays,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface BookingModalProps {
  studioId: string;
  hourlyRate: number;
}

type AvailabilityStatus =
  | "idle"
  | "checking"
  | "available"
  | "booked"
  | "error";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export default function BookingModal({
  studioId,
  hourlyRate,
}: BookingModalProps) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [hours, setHours] = useState("3");
  const [isLoading, setIsLoading] = useState(false);

  const [availability, setAvailability] =
    useState<AvailabilityStatus>("idle");

  const [availabilityMessage, setAvailabilityMessage] = useState("");

  const totalPrice = hourlyRate * Number(hours);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getEndTime = () => {
    if (startTime === "" || hours === "") {
      return "";
    }

    const [hour, minute] = startTime.split(":").map(Number);

    const totalMinutes = hour * 60 + minute + Number(hours) * 60;

    if (totalMinutes >= 24 * 60) {
      return "";
    }

    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;

    return `${String(endHour).padStart(2, "0")}:${String(
      endMinute
    ).padStart(2, "0")}`;
  };

  const endTime = getEndTime();

  const handleOpenModal = () => {
    if (isPending) {
      return;
    }

    if (user === undefined) {
      toast.error("Please login to book this studio.");
      router.push("/login");
      return;
    }

    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen === false || bookingDate === "" || startTime === "" || hours === "") {
      setAvailability("idle");
      setAvailabilityMessage("");
      return;
    }

    const calculatedEndTime = getEndTime();

    if (calculatedEndTime === "") {
      setAvailability("error");
      setAvailabilityMessage("Please select a valid booking time.");
      return;
    }

    const controller = new AbortController();

    const checkAvailability = async () => {
      setAvailability("checking");
      setAvailabilityMessage("Checking availability...");

      try {
        const params = new URLSearchParams({
          studioId,
          bookingDate,
          startTime,
          endTime: calculatedEndTime,
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

        if (response.ok === false) {
          setAvailability("error");
          setAvailabilityMessage(
            data.message || "Unable to check availability."
          );
          return;
        }

        if (data.available === false) {
          setAvailability("booked");
          setAvailabilityMessage(
            "Already Booked - This time slot is unavailable."
          );
          return;
        }

        setAvailability("available");
        setAvailabilityMessage("This time slot is available.");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setAvailability("error");
        setAvailabilityMessage("Unable to check availability.");
      }
    };

    const timer = setTimeout(() => {
      checkAvailability();
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [isOpen, studioId, bookingDate, startTime, hours]);

  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user === undefined) {
      toast.error("Please login to book this studio.");
      router.push("/login");
      return;
    }

    if (bookingDate === "" || startTime === "" || hours === "") {
      toast.error("Please complete all booking fields.");
      return;
    }

    if (endTime === "") {
      toast.error("Please select a valid booking time.");
      return;
    }

    if (availability === "booked") {
      toast.error("This time slot is already booked.");
      return;
    }

    if (availability === "checking") {
      toast.info("Please wait while checking availability.");
      return;
    }

    if (availability === "error") {
      toast.error("Unable to verify availability. Please try again.");
      return;
    }

    if (availability !== "available") {
      toast.error("Please wait until availability is confirmed.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          studioId,
          bookingDate,
          startTime,
          endTime,
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setAvailability("booked");
        setAvailabilityMessage(
          "Already Confirmed - This time slot is no longer available."
        );

        toast.error(
          data.message || "This time slot has already been booked."
        );
        return;
      }

      if (response.ok === false) {
        toast.error(data.message || "Booking failed.");
        return;
      }

      toast.success(data.message || "Booking request submitted successfully!");

      setIsOpen(false);
      setBookingDate("");
      setStartTime("10:00");
      setHours("3");
      setAvailability("idle");
      setAvailabilityMessage("");

      router.refresh();
    } catch {
      toast.error("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date().toLocaleDateString("en-CA");

  const isConfirmDisabled =
    isLoading ||
    availability === "checking" ||
    availability === "booked" ||
    availability === "error" ||
    availability !== "available";

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        disabled={isPending}
        className="w-full rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Book This Studio
      </button>

      {isOpen &&
        isMounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-5 top-5 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close booking modal"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <h2 className="pr-8 text-2xl font-bold text-gray-900">
                  Book Your Studio
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Select your preferred date and time.
                </p>
              </div>

              <form onSubmit={handleBooking} className="space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Users size={17} className="text-violet-600" />
                    Booking Account
                  </label>

                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    {user?.email || "Logged in user"}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bookingDate"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <CalendarDays size={17} className="text-violet-600" />
                    Select Date
                  </label>

                  <input
                    id="bookingDate"
                    type="date"
                    min={today}
                    value={bookingDate}
                    onChange={(event) =>
                      setBookingDate(event.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="startTime"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <Clock size={17} className="text-violet-600" />
                    Start Time
                  </label>

                  <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(event) =>
                      setStartTime(event.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hours"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Booking Hours
                  </label>

                  <select
                    id="hours"
                    value={hours}
                    onChange={(event) => setHours(event.target.value)}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="1">1 Hour</option>
                    <option value="2">2 Hours</option>
                    <option value="3">3 Hours</option>
                    <option value="4">4 Hours</option>
                    <option value="5">5 Hours</option>
                    <option value="6">6 Hours</option>
                  </select>
                </div>

                {endTime !== "" && (
                  <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm">
                    <span className="text-gray-500">Booking Time</span>
                    <span className="font-semibold text-gray-800">
                      {startTime} - {endTime}
                    </span>
                  </div>
                )}

                {availabilityMessage !== "" && (
                  <div
                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                      availability === "available"
                        ? "bg-green-50 text-green-700"
                        : availability === "booked" ||
                            availability === "error"
                          ? "bg-red-50 text-red-700"
                          : "bg-violet-50 text-violet-700"
                    }`}
                  >
                    {availability === "checking" ? (
                      <Loader2 size={17} className="animate-spin" />
                    ) : availability === "available" ? (
                      <CheckCircle size={17} />
                    ) : availability === "booked" ||
                      availability === "error" ? (
                      <AlertCircle size={17} />
                    ) : null}

                    <span>{availabilityMessage}</span>
                  </div>
                )}

                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Hourly Rate</span>

                    <span className="font-semibold text-gray-800">
                      ${hourlyRate}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="flex items-center gap-2 font-semibold text-gray-800">
                      <DollarSign size={18} className="text-violet-600" />
                      Total Price
                    </span>

                    <span className="text-xl font-bold text-violet-600">
                      ${totalPrice}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isConfirmDisabled}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Booking...
                    </>
                  ) : availability === "checking" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Checking Availability...
                    </>
                  ) : availability === "booked" ? (
                    "Already Booked"
                  ) : availability === "error" ? (
                    "Unable to Verify Availability"
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
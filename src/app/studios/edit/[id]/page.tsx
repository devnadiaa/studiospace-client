"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Users,
  Image,
  CheckCircle,
} from "lucide-react";

const amenities = [
  "Professional Lighting",
  "High-Speed Wi-Fi",
  "Air Conditioning",
  "Parking Available",
  "Photography Equipment",
  "Soundproof Room",
  "Waiting Area",
  "Changing Room",
];

interface Studio {
  _id: string;
  title: string;
  category: string;
  capacity: number;
  overview: string;
  hourlyRate: number;
  securityDeposit: number;
  address: string;
  city: string;
  country: string;
  imageUrl: string;
  amenities: string[];
  hostName: string;
  hostEmail: string;
}

const EditStudioPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/studios/${id}`,
        );

        if (!response.ok) {
          setMessage("Studio not found.");
          toast.error("Studio not found.");
          return;
        }

        const data = await response.json();
        setStudio(data);
      } catch (error) {
        setMessage("Failed to load studio.");
        toast.error("Failed to load studio.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studio) {
      return;
    }

    setUpdating(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    const updatedStudio = {
      title: formData.get("title"),
      category: formData.get("category"),
      capacity: Number(formData.get("capacity")),
      overview: formData.get("overview"),
      hourlyRate: Number(formData.get("hourlyRate")),
      securityDeposit: Number(formData.get("securityDeposit")),
      address: formData.get("address"),
      city: formData.get("city"),
      country: formData.get("country"),
      imageUrl: formData.get("imageUrl"),
      amenities: formData.getAll("amenities"),
      hostEmail: studio.hostEmail,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/studios/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudio),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to update studio.");
        return;
      }

      toast.success("Studio updated successfully!");

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-300">
        Loading studio...
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-600 dark:text-gray-300">
          {message || "Studio not found."}
        </p>
        <Link
          href="/my-listings"
          className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to My Listings
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/my-listings"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-violet-600 dark:text-gray-400"
        >
          <ArrowLeft size={18} />
          Back to My Listings
        </Link>

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
            MANAGE YOUR SPACE
          </p>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Edit Studio
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Update your studio information and keep your listing up to date.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                <Building2 className="text-violet-600" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Basic Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update your studio details.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Studio Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={studio.title}
                  required
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none transition focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Studio Category
                  </label>
                  <select
                    name="category"
                    defaultValue={studio.category}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                  >
                    <option>Photo Studio</option>
                    <option>Film Stage</option>
                    <option>Podcast Lounge</option>
                    <option>Music Suite</option>
                    <option>Workshop</option>
                    <option>Sound Stage</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Maximum Capacity
                  </label>
                  <div className="relative">
                    <Users
                      size={18}
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="number"
                      name="capacity"
                      defaultValue={studio.capacity}
                      required
                      className="h-12 w-full rounded-xl border border-gray-200 bg-transparent pl-11 pr-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Detailed Overview
                </label>
                <textarea
                  name="overview"
                  rows={5}
                  defaultValue={studio.overview}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-transparent p-4 text-sm outline-none transition focus:border-violet-500 dark:border-gray-700 dark:text-white"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                <DollarSign className="text-violet-600" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Pricing Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Set your studio rental prices.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  defaultValue={studio.hourlyRate}
                  required
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Security Deposit ($)
                </label>
                <input
                  type="number"
                  name="securityDeposit"
                  defaultValue={studio.securityDeposit}
                  required
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                <MapPin className="text-violet-600" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Location Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update where your studio is located.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Full Address
                </label>
                <input
                  type="text"
                  name="address"
                  defaultValue={studio.address}
                  required
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={studio.city}
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    defaultValue={studio.country}
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
                <Image className="text-violet-600" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Studio Image
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update your studio cover image.
                </p>
              </div>
            </div>

            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              defaultValue={studio.imageUrl}
              required
              className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Studio Amenities
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select the facilities available in your studio.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {amenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 p-3 text-sm text-gray-600 transition hover:border-violet-300 dark:border-gray-800 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    defaultChecked={studio.amenities?.includes(amenity)}
                    className="h-4 w-4 accent-violet-600"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Host Information
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Your account information cannot be changed here.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Host Name
                </label>
                <input
                  type="text"
                  value={studio.hostName}
                  readOnly
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 text-sm text-gray-500 outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Host Email
                </label>
                <input
                  type="email"
                  value={studio.hostEmail}
                  readOnly
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 text-sm text-gray-500 outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Link
              href="/my-listings"
              className="flex h-12 items-center justify-center rounded-xl border border-gray-200 px-7 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={updating}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-8 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CheckCircle size={18} />
              {updating ? "Updating..." : "Update Studio"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditStudioPage;
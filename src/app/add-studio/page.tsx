"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  MapPin,
  UploadCloud,
  Plus,
  CheckCircle,
  Building2,
  DollarSign,
  Users,
  Image as ImageIcon,
} from "lucide-react";

const amenities = [
  "Professional Lighting",
  "High-Speed Wi-Fi",
  "Air Conditioning",
  "Parking Available",
  "Photography Equipment",
  "Soundproof Room",
  "Makeup Room",
  "Waiting Area",
  "Audio Equipment",
  "Projector",
];

const AddStudioPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const studioData = {
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
      hostName: formData.get("hostName"),
      hostEmail: formData.get("hostEmail"),
    };

    try {
      const response = await fetch("http://localhost:5000/studios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to publish studio.");
        return;
      }

      toast.success("Studio published successfully!");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/studios"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-violet-600 dark:text-gray-400"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
            SHARE YOUR CREATIVE SPACE
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            Add Your Studio
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400">
            List your creative space and connect with creators looking
            for the perfect place to bring their ideas to life.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-7">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                  <Building2 size={22} className="text-violet-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Basic Information
                </h2>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Provide the essential details about your studio.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Studio Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter your studio name"
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
                    defaultValue=""
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-gray-300"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="number"
                      name="capacity"
                      min="1"
                      placeholder="e.g. 20 people"
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
                  placeholder="Describe your studio, its atmosphere, facilities and what makes it special..."
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-violet-500 dark:border-gray-700 dark:text-white"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-7">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                  <DollarSign size={22} className="text-violet-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Pricing Details
                </h2>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Set your studio rental price and security deposit.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Hourly Rate ($)
                </label>

                <input
                  type="number"
                  name="hourlyRate"
                  min="0"
                  placeholder="e.g. 45"
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
                  min="0"
                  placeholder="e.g. 100"
                  required
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-7">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                  <MapPin size={22} className="text-violet-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Location Details
                </h2>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Let creators know where your studio is located.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Full Address
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="Street, building, area..."
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
                    placeholder="e.g. Dhaka"
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
                    placeholder="e.g. Bangladesh"
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-7">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                  <ImageIcon size={22} className="text-violet-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Studio Image
                </h2>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add a photo URL to showcase your creative space.
              </p>
            </div>

            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Image URL
            </label>

            <input
              type="url"
              name="imageUrl"
              placeholder="Paste your studio image URL here"
              required
              className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none transition focus:border-violet-500 dark:border-gray-700 dark:text-white"
            />

            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center transition hover:border-violet-400 dark:border-gray-700 dark:bg-gray-800/50">
              <UploadCloud size={30} className="mb-3 text-violet-600" />

              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                Choose an image to upload
              </p>

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or JPEG
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-7">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-3 dark:bg-violet-500/10">
                  <CheckCircle size={22} className="text-violet-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Amenities & Features
                </h2>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select all facilities available in your studio.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {amenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 text-sm text-gray-700 transition hover:border-violet-400 dark:border-gray-700 dark:text-gray-300"
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    className="h-4 w-4 accent-violet-600"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-7">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Host Information
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your account information will be added automatically.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Host Name
                </label>

                <input
                  type="text"
                  name="hostName"
                  value="Logged-in User"
                  readOnly
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Host Email
                </label>

                <input
                  type="email"
                  name="hostEmail"
                  value="user@example.com"
                  readOnly
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Link
              href="/studios"
              className="flex h-12 items-center justify-center rounded-xl border border-gray-200 px-7 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-8 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              <Plus size={18} />
              Publish Studio
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStudioPage;
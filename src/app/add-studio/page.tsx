"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

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

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const MAX_IMAGES = 6;

const AddStudioPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (user === undefined || user === null) {
      toast.info("Please login to publish a studio.");
      router.replace("/login?callbackURL=%2Fadd-studio");
    }
  }, [isPending, user?.id, router]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      return;
    }

    if (selectedFiles.length + files.length > MAX_IMAGES) {
      toast.error(`You can upload a maximum of ${MAX_IMAGES} images.`);
      e.target.value = "";
      return;
    }

    const invalidFile = files.find(
      (file) =>
        file.type !== "image/png" && file.type !== "image/jpeg"
    );

    if (invalidFile) {
      toast.error("Please select PNG, JPG or JPEG images.");
      e.target.value = "";
      return;
    }

    const oversizedFile = files.find(
      (file) => file.size > 32 * 1024 * 1024
    );

    if (oversizedFile) {
      toast.error("Each image must be less than 32 MB.");
      e.target.value = "";
      return;
    }

    const newPreviewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setSelectedFiles((previous) => [...previous, ...files]);
    setPreviewUrls((previous) => [...previous, ...newPreviewUrls]);

    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles((previous) =>
      previous.filter((_, i) => i !== index)
    );

    setPreviewUrls((previous) =>
      previous.filter((_, i) => i !== index)
    );
  };

  const uploadImage = async (file: File) => {
    if (!IMGBB_API_KEY) {
      throw new Error("ImgBB API key is missing.");
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: uploadData,
      }
    );

    const data = await response.json();

    if (!response.ok || data.success !== true) {
      throw new Error(
        data.error?.message || "Image upload failed."
      );
    }

    return data.data.url as string;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to publish a studio.");
      router.push("/login?callbackURL=%2Fadd-studio");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const studioData = {
      title: String(formData.get("title") || "").trim(),
      category: String(formData.get("category") || ""),
      capacity: Number(formData.get("capacity")),
      overview: String(formData.get("overview") || "").trim(),
      hourlyRate: Number(formData.get("hourlyRate")),
      securityDeposit: Number(formData.get("securityDeposit")),
      address: String(formData.get("address") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      country: String(formData.get("country") || "").trim(),
      amenities: formData.getAll("amenities"),
    };

    if (
      !studioData.title ||
      !studioData.category ||
      !studioData.overview ||
      !studioData.address ||
      !studioData.city ||
      !studioData.country
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (
      studioData.capacity <= 0 ||
      studioData.hourlyRate < 0 ||
      studioData.securityDeposit < 0
    ) {
      toast.error("Please enter valid pricing and capacity.");
      return;
    }

    if (selectedFiles.length === 0 && !imageUrl.trim()) {
      toast.error("Please provide an image URL or upload images.");
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedImages: string[] = [];

      if (selectedFiles.length > 0) {
        toast.info("Uploading studio images...");

        uploadedImages = await Promise.all(
          selectedFiles.map((file) => uploadImage(file))
        );
      }

      const allImages = [
        imageUrl.trim(),
        ...uploadedImages,
      ].filter(Boolean);

      const response = await fetch(`${API_URL}/studios`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...studioData,
          imageUrl: allImages[0],
          images: allImages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to publish studio.");
        return;
      }

      toast.success("Studio published successfully!");

      form.reset();
      setSelectedFiles([]);
      setPreviewUrls([]);
      setImageUrl("");

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-300">
        Loading your account...
      </div>
    );
  }

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
                />
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
                  Studio Images
                </h2>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload up to 6 photos of your creative space.
                PNG, JPG or JPEG. Maximum 32 MB per image.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Image URL (Optional)
              </label>

              <input
                type="url"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste a studio image URL here"
                className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none transition focus:border-violet-500 dark:border-gray-700 dark:text-white"
              />
            </div>

            {selectedFiles.length < MAX_IMAGES && (
              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center transition hover:border-violet-400 dark:border-gray-700 dark:bg-gray-800/50">
                <UploadCloud size={30} className="mb-3 text-violet-600" />

                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  Choose images to upload
                </p>

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {selectedFiles.length} / {MAX_IMAGES} images selected
                </p>

                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}

            {(previewUrls.length > 0 || imageUrl) && (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {imageUrl && (
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                    <img
                      src={imageUrl}
                      alt="Studio preview"
                      className="h-36 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      aria-label="Remove image URL"
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-red-50 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>

                    <p className="truncate bg-gray-50 px-3 py-2 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      Image URL
                    </p>
                  </div>
                )}

                {previewUrls.map((url, index) => (
                  <div
                    key={`${selectedFiles[index]?.name}-${index}`}
                    className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={url}
                      alt={`Studio preview ${index + 1}`}
                      className="h-36 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      aria-label={`Remove image ${index + 1}`}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-red-50 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>

                    <p className="truncate bg-gray-50 px-3 py-2 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      {selectedFiles[index]?.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
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
                  value={user.name || ""}
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
                  value={user.email || ""}
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
              disabled={isSubmitting}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-8 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={18} />
              {isSubmitting ? "Publishing..." : "Publish Studio"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStudioPage;
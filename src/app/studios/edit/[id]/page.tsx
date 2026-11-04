"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "react-toastify";
import {
ArrowLeft,
Building2,
MapPin,
DollarSign,
Users,
Image as ImageIcon,
CheckCircle,
UploadCloud,
X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const API_URL = (
process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(//$/, "");

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

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
images?: string[];
amenities: string[];
hostName: string;
hostEmail: string;
hostId?: string;
}

const EditStudioPage = () => {
const { id } = useParams<{ id: string }>();
const router = useRouter();

const { data: session, isPending: sessionLoading } =
authClient.useSession();

const [studio, setStudio] = useState<Studio | null>(null);
const [loading, setLoading] = useState(true);
const [updating, setUpdating] = useState(false);
const [message, setMessage] = useState("");

const [existingImages, setExistingImages] = useState<string[]>([]);
const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
const [previewUrls, setPreviewUrls] = useState<string[]>([]);
const [imageUrlInput, setImageUrlInput] = useState("");

const user = session?.user;

useEffect(() => {
if (sessionLoading) {
return;
}


if (!user) {
  router.replace("/login");
  return;
}

const fetchStudio = async () => {
  try {
    const response = await fetch(`${API_URL}/studios/${id}`, {
      credentials: "include",
    });

    if (!response.ok) {
      setMessage("Studio not found.");
      return;
    }

    const data = await response.json();

    const isOwner =
      (data.hostId && data.hostId === user.id) ||
      (data.hostEmail &&
        user.email &&
        data.hostEmail.toLowerCase() === user.email.toLowerCase());

    if (!isOwner) {
      setMessage("You do not have permission to edit this studio.");
      return;
    }

    setStudio(data);

    const allImages = Array.from(
      new Set([data.imageUrl, ...(data.images || [])].filter(Boolean)),
    );

    setExistingImages(allImages);
  } catch {
    setMessage("Failed to load studio.");
    toast.error("Failed to load studio.");
  } finally {
    setLoading(false);
  }
};

fetchStudio();


}, [id, user?.id, sessionLoading, router]);

const handleAddImageUrl = () => {
const imageUrl = imageUrlInput.trim();


if (!imageUrl) {
  toast.error("Please enter an image URL.");
  return;
}

try {
  const url = new URL(imageUrl);

  if (!["http:", "https:"].includes(url.protocol)) {
    toast.error("Please enter a valid image URL.");
    return;
  }
} catch {
  toast.error("Please enter a valid image URL.");
  return;
}

const totalImages = existingImages.length + selectedFiles.length;

if (totalImages >= 6) {
  toast.error("You can upload a maximum of 6 images.");
  return;
}

if (existingImages.includes(imageUrl)) {
  toast.error("This image URL already exists.");
  return;
}

setExistingImages((prev) => [...prev, imageUrl]);
setImageUrlInput("");

toast.success("Image URL added successfully.");


};

const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
const files = Array.from(e.target.files || []);


if (files.length === 0) {
  return;
}

const availableSlots =
  6 - existingImages.length - selectedFiles.length;

if (availableSlots <= 0) {
  toast.error("You can upload a maximum of 6 images.");
  e.target.value = "";
  return;
}

const validFiles = files.slice(0, availableSlots);

if (files.length > availableSlots) {
  toast.warning(`You can add only ${availableSlots} more image(s).`);
}

const newFiles: File[] = [];
const newPreviews: string[] = [];

validFiles.forEach((file) => {
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    toast.error(`${file.name}: Only PNG and JPEG images are allowed.`);
    return;
  }

  if (file.size > 32 * 1024 * 1024) {
    toast.error(`${file.name}: Image size must be under 32MB.`);
    return;
  }

  newFiles.push(file);
  newPreviews.push(URL.createObjectURL(file));
});

setSelectedFiles((prev) => [...prev, ...newFiles]);
setPreviewUrls((prev) => [...prev, ...newPreviews]);

e.target.value = "";


};

const removeExistingImage = (index: number) => {
setExistingImages((prev) => prev.filter((_, i) => i !== index));
};

const removeSelectedImage = (index: number) => {
URL.revokeObjectURL(previewUrls[index]);


setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
setPreviewUrls((prev) => prev.filter((_, i) => i !== index));


};

const uploadImage = async (file: File) => {
if (!IMGBB_API_KEY) {
throw new Error("ImgBB API key is missing.");
}


const formData = new FormData();
formData.append("image", file);

const response = await fetch(
  `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
  {
    method: "POST",
    body: formData,
  },
);

const data = await response.json();

if (!response.ok || data.success !== true) {
  throw new Error("Image upload failed.");
}

return data.data.url as string;


};

const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();


if (!studio) {
  return;
}

const totalImages = existingImages.length + selectedFiles.length;

if (totalImages === 0) {
  toast.error("Please keep or upload at least one image.");
  return;
}

setUpdating(true);
setMessage("");

const formData = new FormData(e.currentTarget);

try {
  const uploadedImages = await Promise.all(
    selectedFiles.map((file) => uploadImage(file)),
  );

  const allImages = [...existingImages, ...uploadedImages];

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
    imageUrl: allImages[0],
    images: allImages,
    amenities: formData.getAll("amenities"),
  };

  const response = await fetch(`${API_URL}/studios/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedStudio),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    toast.error(data.message || "Failed to update studio.");
    return;
  }

  toast.success("Studio updated successfully!");

  router.push("/my-listings");
  router.refresh();
} catch (error) {
  const errorMessage =
    error instanceof Error
      ? error.message
      : "Something went wrong. Please try again.";

  toast.error(errorMessage);
} finally {
  setUpdating(false);
}


};

if (loading || sessionLoading) {
return ( <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-300">
Loading studio... </div>
);
}

if (!studio) {
return ( <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-950"> <p className="text-gray-600 dark:text-gray-300">
{message || "Studio not found."} </p>


    <Link
      href="/my-listings"
      className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white"
    >
      Back to My Listings
    </Link>
  </div>
);


}

return ( <section className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950"> <div className="mx-auto max-w-4xl"> <Link
       href="/my-listings"
       className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-violet-600 dark:text-gray-400"
     > <ArrowLeft size={18} />
Back to My Listings </Link>


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
                required
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
                  min="1"
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
            />
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
              min="1"
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
              min="0"
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
            <ImageIcon className="text-violet-600" size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Studio Gallery
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your studio photos. Keep, remove, or add images.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Image URL
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="url"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-4 text-sm outline-none focus:border-violet-500 dark:border-gray-700 dark:text-white"
            />

            <button
              type="button"
              onClick={handleAddImageUrl}
              className="h-12 shrink-0 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Add Image
            </button>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {existingImages.map((image, index) => (
            <div
              key={image}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <img
                src={image}
                alt={`Studio image ${index + 1}`}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeExistingImage(index)}
                className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white opacity-90 transition hover:bg-red-600"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>

              {index === 0 && (
                <span className="absolute bottom-2 left-2 rounded-md bg-violet-600 px-2 py-1 text-xs font-semibold text-white">
                  Cover Image
                </span>
              )}
            </div>
          ))}

          {previewUrls.map((preview, index) => (
            <div
              key={preview}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-violet-300 dark:border-violet-700"
            >
              <img
                src={preview}
                alt={`New studio image ${index + 1}`}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeSelectedImage(index)}
                className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>

              <span className="absolute bottom-2 left-2 rounded-md bg-violet-600 px-2 py-1 text-xs font-semibold text-white">
                New Image
              </span>
            </div>
          ))}
        </div>

        {existingImages.length + selectedFiles.length < 6 && (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center transition hover:border-violet-500 hover:bg-violet-50 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-violet-500/5">
            <UploadCloud size={32} className="mb-3 text-violet-600" />

            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              Click to upload images
            </span>

            <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              PNG or JPEG · Maximum 32MB per image
            </span>

            <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {6 - existingImages.length - selectedFiles.length} image(s) remaining
            </span>

            <input
              type="file"
              accept="image/png,image/jpeg"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          You can keep or upload up to 6 images. The first image will be
          used as the cover image.
        </p>
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
              value={studio.hostName || ""}
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
              value={studio.hostEmail || ""}
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

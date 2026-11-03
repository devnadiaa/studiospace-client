import Link from "next/link";
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
} from "lucide-react";
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

const StudioDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let studio: Studio | null = null;

  try {
    const response = await fetch(
      `http://localhost:5000/studios/${id}`,
      {
        cache: "no-store",
      },
    );

    if (response.ok) {
      studio = await response.json();
    }
  } catch {
    studio = null;
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
                      {studio.rating ?? "New"} ({studio.reviewCount ?? 0}{" "}
                      reviews)
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Reviews & Ratings
              </h2>

              <div className="mt-5 flex items-center gap-3">
                <Star
                  size={28}
                  className="fill-amber-400 text-amber-400"
                />

                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {studio.rating ?? "New"}
                </span>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({studio.reviewCount ?? 0} reviews)
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {studio.reviewCount
                  ? "Guest reviews will be displayed here."
                  : "No reviews yet. Be the first to share your experience after booking."}
              </p>
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
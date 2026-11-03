import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TermsPage = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-violet-600 dark:text-gray-400"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm sm:p-10 dark:border-gray-800 dark:bg-gray-900">
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
            STUDIOSPACE
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-gray-400">
            Welcome to StudioSpace. By using our platform, you agree to
            follow these terms when exploring, listing, and booking creative
            studio spaces.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                1. Account Responsibility
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                Users are responsible for maintaining the accuracy of their
                account information and keeping their login credentials secure.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                2. Studio Listings
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                Studio hosts should provide accurate information about their
                spaces, including images, location, facilities, capacity,
                availability, and pricing.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                3. Booking Information
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                Users should review studio details, booking dates, rental
                hours, and applicable charges before submitting a booking
                request.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                4. Cancellations
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                Booking cancellation options depend on the booking status.
                Pending bookings may be cancelled through the user's account.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                5. Responsible Use
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                Users should respect studio property, equipment, and other
                participants. Any misuse of the platform or misleading
                information should be avoided.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                6. Platform Updates
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                StudioSpace may update its features and platform information
                as the service develops.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-6 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Thank you for choosing StudioSpace and being part of our
              creative community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
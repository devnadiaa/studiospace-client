import Link from "next/link";
import {
  Search,
  CalendarDays,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  CreditCard,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore a wide range of creative studios, photography spaces, podcast rooms, and music suites.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date and booking hours according to your project requirements.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Submit your booking request and get ready to bring your creative ideas to life.",
    icon: CheckCircle,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Visit your selected studio, use the available facilities, and start creating something amazing.",
    icon: Sparkles,
  },
];

const benefits = [
  {
    title: "Secure Booking",
    description:
      "Your booking information stays protected throughout the booking process.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Hours",
    description:
      "Choose booking hours that work best for your creative project.",
    icon: Clock,
  },
  {
    title: "Transparent Pricing",
    description:
      "Check studio rental rates and security deposits before booking.",
    icon: CreditCard,
  },
];

const HowItWorksPage = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gray-950 px-6 py-20 text-center sm:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-widest text-violet-400">
            SIMPLE & EASY PROCESS
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-5xl">
            How StudioSpace Works
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Finding and booking your perfect creative space has never
            been easier. Follow four simple steps and start creating.
          </p>

          <Link
            href="/studios"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Explore Studios
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
              FOUR SIMPLE STEPS
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Start Creating in No Time
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-400">
              From discovering a space to producing your next project,
              we make the entire experience simple and convenient.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-gray-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
                      <Icon size={26} className="text-violet-600" />
                    </div>

                    <span className="text-3xl font-bold text-gray-200 dark:text-gray-700">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white px-6 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
              WHY STUDIOSPACE
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              A Better Way to Book Creative Spaces
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-gray-100 p-7 dark:border-gray-800"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
                    <Icon size={26} className="text-violet-600" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-violet-600 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Bring Your Ideas to Life?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-violet-100">
            Discover inspiring creative spaces and find the perfect
            studio for your next project.
          </p>

          <Link
            href="/studios"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-gray-100"
          >
            Find Your Studio
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksPage;
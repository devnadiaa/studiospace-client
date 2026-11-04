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
    <main className="min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <section className="relative overflow-hidden bg-gray-950 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute -right-32 -bottom-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2">
            <Sparkles size={15} className="text-violet-400" />

            <span className="text-xs font-semibold tracking-[0.2em] text-violet-300">
              SIMPLE & EASY PROCESS
            </span>
          </div>

          <h1 className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            How{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
              StudioSpace
            </span>{" "}
            Works
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-gray-300 sm:text-base">
            Finding and booking your perfect creative space has never
            been easier. Follow four simple steps and start creating.
          </p>

          <Link
            href="/studios"
            className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-violet-600/30"
          >
            Explore Studios
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-900/10" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 dark:border-violet-900 dark:bg-violet-950/50">
              <span className="h-2 w-2 rounded-full bg-violet-600" />

              <span className="text-xs font-bold tracking-[0.15em] text-violet-700 dark:text-violet-300">
                FOUR SIMPLE STEPS
              </span>
            </div>

            <h2 className="text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Start Creating in No Time
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400">
              From discovering a space to producing your next project,
              we make the entire experience simple and convenient.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div className="pointer-events-none absolute top-12 right-[12%] left-[12%] hidden border-t-2 border-dashed border-violet-200 lg:block dark:border-violet-900" />

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/50 sm:p-7 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-violet-800 dark:hover:shadow-violet-950/20"
                >
                  <div className="relative flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700 transition-all duration-300 group-hover:from-violet-600 group-hover:to-purple-600 group-hover:text-white dark:from-violet-950 dark:to-purple-950 dark:text-violet-300 dark:group-hover:from-violet-600 dark:group-hover:to-purple-600 dark:group-hover:text-white">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>

                    <span className="text-3xl font-bold tracking-tight text-gray-200 transition-colors group-hover:text-violet-300 dark:text-gray-700 dark:group-hover:text-violet-800">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-bold text-gray-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-400">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>

                  <div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl bg-gradient-to-r from-violet-600 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24 dark:bg-gray-900">
        <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-900/10" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 dark:border-violet-900 dark:bg-violet-950/50">
              <ShieldCheck size={14} className="text-violet-600 dark:text-violet-400" />

              <span className="text-xs font-bold tracking-[0.15em] text-violet-700 dark:text-violet-300">
                WHY STUDIOSPACE
              </span>
            </div>

            <h2 className="text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              A Better Way to Book Creative Spaces
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400">
              Everything you need for a smooth and convenient studio
              booking experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:bg-white hover:shadow-xl hover:shadow-violet-100/50 sm:p-8 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-violet-800 dark:hover:bg-gray-900 dark:hover:shadow-violet-950/20"
                >
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-violet-100/60 transition-transform duration-500 group-hover:scale-150 dark:bg-violet-950/30" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700 transition-all duration-300 group-hover:from-violet-600 group-hover:to-purple-600 group-hover:text-white dark:from-violet-950 dark:to-purple-950 dark:text-violet-300 dark:group-hover:from-violet-600 dark:group-hover:to-purple-600 dark:group-hover:text-white">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>

                    <span className="text-sm font-bold tracking-wider text-gray-300 group-hover:text-violet-500 dark:text-gray-700">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="relative mt-7 text-lg font-bold text-gray-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-400">
                    {benefit.title}
                  </h3>

                  <p className="relative mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                    {benefit.description}
                  </p>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-600 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-purple-700 px-6 py-14 text-center shadow-2xl shadow-violet-900/20 sm:px-12 sm:py-16">
          <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full border border-white/10" />

          <div className="absolute -right-20 -bottom-32 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
              <Sparkles size={15} className="text-violet-100" />

              <span className="text-xs font-semibold tracking-[0.15em] text-violet-100">
                YOUR CREATIVE JOURNEY STARTS HERE
              </span>
            </div>

            <h2 className="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Bring Your Ideas to Life?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-violet-100 sm:text-base">
              Discover inspiring creative spaces and find the perfect
              studio for your next project.
            </p>

            <Link
              href="/studios"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-violet-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100"
            >
              Find Your Studio
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
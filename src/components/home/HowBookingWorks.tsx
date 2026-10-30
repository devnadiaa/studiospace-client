import {
  Search,
  Clock,
  CalendarCheck,
  Clapperboard,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore creative studios and find the perfect space for your project.",
    icon: <Search size={28} />,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date and shooting hours according to your needs.",
    icon: <Clock size={28} />,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Confirm your booking and get ready for your creative session.",
    icon: <CalendarCheck size={28} />,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Bring your ideas to life in a space designed for creativity.",
    icon: <Clapperboard size={28} />,
  },
];

const HowBookingWorks = () => {
  return (
    <section className="bg-white px-6 py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
            SIMPLE BOOKING PROCESS
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            How Booking Works
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-500 dark:text-gray-400">
            Booking your perfect creative space is simple.
            Just follow these four easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group rounded-2xl border border-gray-100 bg-gray-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-950">
                  {step.icon}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowBookingWorks;
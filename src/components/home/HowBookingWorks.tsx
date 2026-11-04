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
icon: Search,
},
{
number: "02",
title: "Select Shoot Hours",
description:
"Choose your preferred date and shooting hours according to your needs.",
icon: Clock,
},
{
number: "03",
title: "Book Instantly",
description:
"Confirm your booking and get ready for your creative session.",
icon: CalendarCheck,
},
{
number: "04",
title: "Create & Produce",
description:
"Bring your ideas to life in a space designed for creativity.",
icon: Clapperboard,
},
];

const HowBookingWorks = () => {
return ( <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 dark:bg-gray-950"> <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-100/50 blur-3xl dark:bg-violet-900/10" />


  <div className="relative mx-auto max-w-7xl">
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 dark:border-violet-900 dark:bg-violet-950/50">
        <span className="h-2 w-2 rounded-full bg-violet-600" />
        <p className="text-xs font-bold tracking-[0.18em] text-violet-700 dark:text-violet-300 sm:text-sm">
          SIMPLE BOOKING PROCESS
        </p>
      </div>

      <h2 className="text-3xl leading-tight font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
        How Booking <span className="text-violet-600">Works</span>
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
        Booking your perfect creative space is simple. Just follow these
        four easy steps and get ready to bring your ideas to life.
      </p>
    </div>

    <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <div className="absolute top-8 right-[12%] left-[12%] hidden h-px border-t-2 border-dashed border-violet-200 lg:block dark:border-violet-900" />

      {steps.map((step) => {
        const Icon = step.icon;

        return (
          <div
            key={step.number}
            className="group relative rounded-2xl border border-gray-200/80 bg-gray-50/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-white hover:shadow-xl hover:shadow-violet-100/50 sm:p-6 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-violet-800 dark:hover:bg-gray-900"
          >
            <div className="relative z-10 mb-7 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700 transition-all duration-300 group-hover:from-violet-600 group-hover:to-purple-600 group-hover:text-white dark:from-violet-950 dark:to-purple-950 dark:text-violet-300 dark:group-hover:from-violet-600 dark:group-hover:to-purple-600 dark:group-hover:text-white">
                <Icon size={27} strokeWidth={1.8} />
              </div>

              <span className="text-3xl font-extrabold tracking-tight text-gray-200 transition-colors group-hover:text-violet-200 dark:text-gray-700 dark:group-hover:text-violet-900">
                {step.number}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-400">
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


);
};

export default HowBookingWorks;

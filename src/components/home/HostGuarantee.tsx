import {
  ShieldCheck,
  BadgeCheck,
  Wrench,
  Headset,
} from "lucide-react";

const guarantees = [
  {
    title: "Liability Protection",
    description:
      "Extra peace of mind with protection designed to support hosts and creators.",
    icon: <ShieldCheck size={28} strokeWidth={1.8} />,
  },
  {
    title: "Verified Profiles",
    description:
      "Connect with trusted creators and studio hosts through verified profiles.",
    icon: <BadgeCheck size={28} strokeWidth={1.8} />,
  },
  {
    title: "Equipment Safety",
    description:
      "Keep your creative sessions safe with proper equipment care and attention.",
    icon: <Wrench size={28} strokeWidth={1.8} />,
  },
  {
    title: "24/7 Host Support",
    description:
      "Get support whenever you need help with your studio hosting experience.",
    icon: <Headset size={28} strokeWidth={1.8} />,
  },
];

const HostGuarantee = () => {
  return (
    <section className="bg-gray-50 px-6 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold tracking-[0.2em] text-violet-600">
            TRUST & SUPPORT
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Your Creativity,{" "}
            <span className="text-violet-600">Our Priority</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
            We want every creator and studio host to feel confident,
            supported, and ready to create something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item, index) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-gray-200/80 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/40 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-violet-800 dark:hover:shadow-none"
            >
              <div className="mb-7 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition duration-300 group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-950/60 dark:text-violet-400 dark:group-hover:bg-violet-600">
                  {item.icon}
                </div>

                <span className="text-sm font-semibold tracking-wider text-gray-300 dark:text-gray-700">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                {item.description}
              </p>

              <div className="mt-6 h-1 w-10 rounded-full bg-violet-200 transition-all duration-300 group-hover:w-16 group-hover:bg-violet-600 dark:bg-violet-900" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostGuarantee;
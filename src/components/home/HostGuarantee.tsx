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
    icon: <ShieldCheck size={28} />,
  },
  {
    title: "Verified Profiles",
    description:
      "Connect with trusted creators and studio hosts through verified profiles.",
    icon: <BadgeCheck size={28} />,
  },
  {
    title: "Equipment Safety",
    description:
      "Keep your creative sessions safe with proper equipment care and attention.",
    icon: <Wrench size={28} />,
  },
  {
    title: "24/7 Host Support",
    description:
      "Get support whenever you need help with your studio hosting experience.",
    icon: <Headset size={28} />,
  },
];

const HostGuarantee = () => {
  return (
    <section className="bg-gray-50 px-6 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
            TRUST & SUPPORT
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Your Creativity, Our Priority
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
            We want every creator and studio host to feel confident,
            supported, and ready to create something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostGuarantee;
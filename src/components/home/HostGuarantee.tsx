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
icon: ShieldCheck,
},
{
title: "Verified Profiles",
description:
"Connect with trusted creators and studio hosts through verified profiles.",
icon: BadgeCheck,
},
{
title: "Equipment Safety",
description:
"Keep your creative sessions safe with proper equipment care and attention.",
icon: Wrench,
},
{
title: "24/7 Host Support",
description:
"Get support whenever you need help with your studio hosting experience.",
icon: Headset,
},
];

const HostGuarantee = () => {
return ( <section className="relative overflow-hidden bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 dark:bg-gray-900"> <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-900/10" />


  <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/10" />

  <div className="relative mx-auto max-w-7xl">
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 dark:border-violet-900 dark:bg-violet-950/50">
        <span className="h-2 w-2 rounded-full bg-violet-600" />

        <p className="text-xs font-bold tracking-[0.18em] text-violet-700 dark:text-violet-300 sm:text-sm">
          TRUST & SUPPORT
        </p>
      </div>

      <h2 className="text-3xl leading-tight font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
        Your Creativity,{" "}
        <span className="text-violet-600">Our Priority</span>
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
        We want every creator and studio host to feel confident,
        supported, and ready to create something amazing.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {guarantees.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/50 sm:p-6 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-violet-800 dark:hover:shadow-violet-950/20"
          >
            <div className="absolute top-0 right-0 h-28 w-28 translate-x-12 -translate-y-12 rounded-full bg-violet-50 transition-transform duration-500 group-hover:scale-150 dark:bg-violet-950/30" />

            <div className="relative flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700 transition-all duration-300 group-hover:from-violet-600 group-hover:to-purple-600 group-hover:text-white dark:from-violet-950 dark:to-purple-950 dark:text-violet-300 dark:group-hover:from-violet-600 dark:group-hover:to-purple-600 dark:group-hover:text-white">
                <Icon size={27} strokeWidth={1.8} />
              </div>

              <span className="text-sm font-bold tracking-wider text-gray-300 transition-colors group-hover:text-violet-500 dark:text-gray-700">
                0{index + 1}
              </span>
            </div>

            <h3 className="relative mt-7 text-lg font-bold text-gray-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-400">
              {item.title}
            </h3>

            <p className="relative mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
              {item.description}
            </p>

            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-600 to-purple-500 transition-all duration-300 group-hover:w-full" />
          </div>
        );
      })}
    </div>
  </div>
</section>


);
};

export default HostGuarantee;

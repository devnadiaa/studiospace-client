import Image from "next/image";
import Link from "next/link";
import {
Camera,
Lightbulb,
Users,
Target,
ShieldCheck,
Sparkles,
ArrowRight,
CheckCircle2,
} from "lucide-react";

const values = [
{
title: "Our Mission",
description:
"To make creative spaces accessible to everyone by connecting talented creators with inspiring studios.",
icon: Target,
},
{
title: "Our Vision",
description:
"To build a creative community where ideas grow, collaborations happen, and creativity has no limits.",
icon: Lightbulb,
},
{
title: "Our Community",
description:
"We bring together photographers, filmmakers, musicians, podcasters, and creative professionals.",
icon: Users,
},
];

const features = [
{
title: "Spaces for Every Creator",
description:
"Discover photography studios, podcast rooms, music suites, workshops, and more.",
icon: Camera,
},
{
title: "Trusted Experience",
description:
"Find studio information, available facilities, and transparent pricing before booking.",
icon: ShieldCheck,
},
{
title: "Creative Freedom",
description:
"Choose a space that matches your ideas and gives you room to create something amazing.",
icon: Sparkles,
},
];

const highlights = [
"Discover inspiring creative spaces",
"Explore facilities and transparent pricing",
"Connect with a creative community",
];

const AboutPage = () => {
return ( <main className="min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950"> <section className="relative overflow-hidden bg-gray-950 px-4 py-20 sm:px-6 sm:py-28 lg:py-32"> <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />


    <div className="absolute -right-32 -bottom-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

    <div className="relative mx-auto max-w-5xl text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2">
        <Sparkles size={15} className="text-violet-400" />

        <span className="text-xs font-semibold tracking-[0.2em] text-violet-300">
          GET TO KNOW US
        </span>
      </div>

      <h1 className="text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
        About{" "}
        <span className="bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
          StudioSpace
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-gray-300 sm:text-base">
        We believe every great idea deserves the perfect space.
        StudioSpace connects creative minds with inspiring places
        where imagination becomes reality.
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

  <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="mb-5 inline-flex items-center gap-2">
          <span className="h-1 w-8 rounded-full bg-violet-600" />

          <p className="text-xs font-bold tracking-[0.2em] text-violet-600 dark:text-violet-400">
            WHO WE ARE
          </p>
        </div>

        <h2 className="text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Making Creative Spaces Accessible to Everyone
        </h2>

        <p className="mt-6 text-sm leading-8 text-gray-600 dark:text-gray-400">
          StudioSpace is a creative workspace booking platform
          designed to help creators find and book professional
          spaces for their projects.
        </p>

        <p className="mt-4 text-sm leading-8 text-gray-600 dark:text-gray-400">
          Whether you are a photographer looking for the perfect
          studio, a musician searching for a music suite, or a
          podcaster needing a professional recording room,
          StudioSpace helps you discover the right environment.
        </p>

        <p className="mt-4 text-sm leading-8 text-gray-600 dark:text-gray-400">
          We also help studio owners share their spaces with
          talented creators and connect with a growing creative
          community.
        </p>

        <div className="mt-8 space-y-4">
          {highlights.map((highlight) => (
            <div key={highlight} className="flex items-center gap-3">
              <CheckCircle2
                size={19}
                className="shrink-0 text-violet-600 dark:text-violet-400"
              />

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {highlight}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/studios"
          className="group mt-9 inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          Discover Our Spaces
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="relative mx-auto w-full max-w-xl">
        <div className="absolute -top-5 -right-5 h-32 w-32 rounded-3xl border-2 border-violet-200 dark:border-violet-900" />

        <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-3xl bg-violet-100 dark:bg-violet-950/50" />

        <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-gray-900/10">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85"
            alt="Creative studio workspace"
            width={1000}
            height={700}
            unoptimized
            className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />

          <div className="absolute right-5 bottom-5 left-5 sm:right-7 sm:bottom-7 sm:left-7">
            <p className="text-lg font-bold text-white sm:text-2xl">
              Your Space.
            </p>

            <p className="mt-1 text-sm font-semibold text-violet-300 sm:text-base">
              Your Creative Freedom.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 dark:bg-gray-900">
    <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-900/10" />

    <div className="relative mx-auto max-w-7xl">
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 dark:border-violet-900 dark:bg-violet-950/50">
          <Sparkles size={14} className="text-violet-600 dark:text-violet-400" />

          <span className="text-xs font-bold tracking-[0.15em] text-violet-700 dark:text-violet-300">
            WHAT DRIVES US
          </span>
        </div>

        <h2 className="text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Our Mission, Vision & Community
        </h2>

        <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400">
          The ideas and values that inspire everything we do at
          StudioSpace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {values.map((value, index) => {
          const Icon = value.icon;

          return (
            <div
              key={value.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:bg-white hover:shadow-xl hover:shadow-violet-100/50 sm:p-8 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-violet-800 dark:hover:bg-gray-900 dark:hover:shadow-violet-950/20"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-violet-100/60 transition-transform duration-500 group-hover:scale-150 dark:bg-violet-950/30" />

              <div className="relative flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700 transition-all duration-300 group-hover:from-violet-600 group-hover:to-purple-600 group-hover:text-white dark:from-violet-950 dark:to-purple-950 dark:text-violet-300 dark:group-hover:from-violet-600 dark:group-hover:to-purple-600 dark:group-hover:text-white">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <span className="text-sm font-bold tracking-wider text-gray-300 group-hover:text-violet-500 dark:text-gray-700">
                  0{index + 1}
                </span>
              </div>

              <h3 className="relative mt-7 text-xl font-bold text-gray-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-400">
                {value.title}
              </h3>

              <p className="relative mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                {value.description}
              </p>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-600 to-purple-500 transition-all duration-300 group-hover:w-full" />
            </div>
          );
        })}
      </div>
    </div>
  </section>

  <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
    <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-900/10" />

    <div className="relative mx-auto max-w-7xl">
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 dark:border-violet-900 dark:bg-violet-950/50">
          <span className="h-2 w-2 rounded-full bg-violet-600" />

          <span className="text-xs font-bold tracking-[0.15em] text-violet-700 dark:text-violet-300">
            WHY CHOOSE US
          </span>
        </div>

        <h2 className="text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Everything Creators Need
        </h2>

        <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400">
          We make it easier to discover creative spaces and focus
          on what matters most: your ideas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/50 sm:p-8 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-violet-800 dark:hover:shadow-violet-950/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 text-violet-700 transition-all duration-300 group-hover:from-violet-600 group-hover:to-purple-600 group-hover:text-white dark:from-violet-950 dark:to-purple-950 dark:text-violet-300 dark:group-hover:from-violet-600 dark:group-hover:to-purple-600 dark:group-hover:text-white">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <span className="text-sm font-bold tracking-wider text-gray-300 group-hover:text-violet-500 dark:text-gray-700">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-7 text-lg font-bold text-gray-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-400">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  <section className="px-4 pb-16 sm:px-6 sm:pb-20">
    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-purple-700 px-6 py-14 text-center shadow-2xl shadow-violet-900/20 sm:px-12 sm:py-16">
      <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full border border-white/10" />

      <div className="absolute -right-20 -bottom-32 h-80 w-80 rounded-full border border-white/10" />

      <div className="relative mx-auto max-w-2xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
          <Sparkles size={15} className="text-violet-100" />

          <span className="text-xs font-semibold tracking-[0.15em] text-violet-100">
            YOUR NEXT CHAPTER STARTS HERE
          </span>
        </div>

        <h2 className="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
          Let&apos;s Create Something Amazing
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-violet-100 sm:text-base">
          Your next creative project starts with the right space.
          Discover a studio that brings your vision to life.
        </p>

        <Link
          href="/studios"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-violet-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100"
        >
          Find Your Space
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

export default AboutPage;

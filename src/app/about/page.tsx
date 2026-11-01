import Link from "next/link";
import {
  Camera,
  Lightbulb,
  Users,
  Target,
  ShieldCheck,
  Sparkles,
  ArrowRight,
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

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gray-950 px-6 py-24 text-center sm:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-widest text-violet-400">
            GET TO KNOW US
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-5xl">
            About StudioSpace
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            We believe every great idea deserves the perfect space.
            StudioSpace connects creative minds with inspiring places
            where imagination becomes reality.
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
              WHO WE ARE
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
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
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85"
              alt="Creative studio workspace"
              className="h-80 w-full rounded-3xl object-cover shadow-xl sm:h-105"
            />

            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-5 shadow-lg dark:bg-gray-900">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Your Space.
              </p>
              <p className="mt-1 text-sm font-semibold text-violet-600">
                Your Creative Freedom.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white px-6 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
              WHAT DRIVES US
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Our Mission, Vision & Community
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-gray-100 p-7 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
                    <Icon size={27} className="text-violet-600" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
              WHY CHOOSE US
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Everything Creators Need
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-400">
              We make it easier to discover creative spaces and focus
              on what matters most: your ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
                    <Icon size={27} className="text-violet-600" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
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
      </div>

      <div className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-violet-600 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Let's Create Something Amazing
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-violet-100">
            Your next creative project starts with the right space.
            Discover a studio that brings your vision to life.
          </p>

          <Link
            href="/studios"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-gray-100"
          >
            Find Your Space
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
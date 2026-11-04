import Link from "next/link";
import { Aperture, ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const categories = [
  { name: "Photo Studios", value: "Photo Studio" },
  { name: "Sound Stages", value: "Sound Stage" },
  { name: "Podcast Rooms", value: "Podcast Lounge" },
  { name: "Music Suites", value: "Music Suite" },
  { name: "Art Workshops", value: "Workshop" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com",
    icon: FaFacebookF,
    className: "bg-[#1877F2]",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com",
    icon: FaInstagram,
    className:
      "bg-gradient-to-tr from-[#FCAF45] via-[#E1306C] to-[#833AB4]",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: FaLinkedinIn,
    className: "bg-[#0A66C2]",
  },
  {
    name: "X",
    href: "https://x.com",
    icon: FaXTwitter,
    className: "bg-black dark:bg-white dark:text-black",
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white">
                <Aperture size={25} />
              </span>

              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Studio<span className="text-violet-600">Space</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600 dark:text-gray-400">
              Making creative spaces accessible to everyone. Discover
              inspiring studios, connect with creators, and bring your
              ideas to life.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon, className }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md ${className}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "Explore Studios", href: "/studios" },
                { name: "How It Works", href: "/how-it-works" },
                { name: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-violet-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold text-gray-900 dark:text-white">
              Popular Categories
            </h3>

            <ul className="space-y-4 text-sm">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category.value)}`}
                    className="transition-colors hover:text-violet-600"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold text-gray-900 dark:text-white">
              Stay in the Loop
            </h3>

            <p className="mb-5 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Subscribe to receive updates about creative spaces and
              new opportunities.
            </p>

            <div className="flex rounded-xl border border-gray-200 bg-white p-1.5 transition focus-within:border-violet-500 dark:border-gray-800 dark:bg-gray-900">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Your email address"
                className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
              />

              <button
                type="button"
                aria-label="Newsletter subscription"
                disabled
                title="Newsletter subscription is not connected yet"
                className="flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-lg bg-violet-600 text-white opacity-60"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Newsletter subscription is not connected yet.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-gray-200 pt-7 text-sm text-gray-500 sm:flex-row dark:border-gray-800">
          <p>
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <Link
            href="/terms"
            className="transition-colors hover:text-violet-600"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
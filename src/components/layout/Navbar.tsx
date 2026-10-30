"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Aperture,
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon,
} from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/95">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white">
            <Aperture size={25} />
          </span>

          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Studio<span className="text-violet-600">Space.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-violet-600"
                  : "text-gray-600 hover:text-violet-600 dark:text-gray-300"
              }`}
            >
              {link.name}

              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-violet-600" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {mounted && theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <Link
            href="/login"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="group flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-700"
          >
            Register
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {mounted && theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg dark:border-gray-800 dark:bg-gray-950 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-violet-50 text-violet-600 dark:bg-violet-950"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full bg-violet-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-violet-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
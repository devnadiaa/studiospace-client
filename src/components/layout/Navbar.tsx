"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Aperture,
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon,
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarDays,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    setAvatarError(false);
  }, [user?.image]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
  ];

  const profileLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add New Studio",
      href: "/add-studio",
      icon: PlusCircle,
    },
    {
      name: "My Studio Listings",
      href: "/my-listings",
      icon: Building2,
    },
    {
      name: "My Bookings",
      href: "/my-bookings",
      icon: CalendarDays,
    },
    {
      name: "Host Booking Requests",
      href: "/host-bookings",
      icon: ClipboardList,
    },
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

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message);
        return;
      }

      setIsProfileOpen(false);
      setIsMenuOpen(false);

      toast.success("Logged out successfully!");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Logout failed. Please try again."
      );
    }
  };

  const UserAvatar = ({ size = 40 }: { size?: number }) => {
    return user?.image && !avatarError ? (
      <img
        src={user.image}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        onError={() => setAvatarError(true)}
        className="shrink-0 rounded-full object-cover"
        style={{
          width: size,
          height: size,
        }}
      />
    ) : (
      <span
        style={{
          width: size,
          height: size,
        }}
        className="flex shrink-0 items-center justify-center rounded-full bg-violet-600 font-semibold text-white"
      >
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </span>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/95">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white sm:h-11 sm:w-11">
            <Aperture size={23} className="sm:hidden" />
            <Aperture size={25} className="hidden sm:block" />
          </span>

          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Studio<span className="text-violet-600">Space.</span>
          </span>
        </Link>

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

          {!isPending &&
            (user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-label="Open profile menu"
                  aria-expanded={isProfileOpen}
                  className="flex items-center gap-2 rounded-full border border-gray-200 py-1.5 pl-1.5 pr-3 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <UserAvatar size={36} />

                  <span className="max-w-28 truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {user.name}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-gray-500 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-14 w-60 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                    <div className="border-b border-gray-100 px-3 py-3 dark:border-gray-800">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-2">
                      {profileLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-violet-50 hover:text-violet-600 dark:text-gray-200 dark:hover:bg-gray-800"
                          >
                            <Icon size={17} />
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>

                    <div className="border-t border-gray-100 pt-2 dark:border-gray-800">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 sm:h-10 sm:w-10"
          >
            {mounted && theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 sm:h-10 sm:w-10"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-5 shadow-lg dark:border-gray-800 dark:bg-gray-950 lg:hidden">
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

            {!isPending && (
              <div className="mt-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                {user ? (
                  <>
                    <div className="mb-4 flex items-center gap-3 px-2">
                      <UserAvatar size={40} />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      {profileLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-violet-50 hover:text-violet-600 dark:text-gray-200 dark:hover:bg-gray-800"
                          >
                            <Icon size={18} />
                            {link.name}
                          </Link>
                        );
                      })}

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
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
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
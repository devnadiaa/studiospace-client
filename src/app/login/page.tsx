"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const requestedPath = searchParams.get("callbackURL");

  const redirectPath =
    requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
      ? requestedPath
      : "/";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
        callbackURL: redirectPath,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login successful!");

      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}${redirectPath}`,
      });

      if (error) {
        toast.error(error.message);
        setIsGoogleLoading(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Google login failed. Please try again."
      );

      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm font-semibold tracking-widest text-violet-600">
              WELCOME BACK
            </p>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Login to StudioSpace
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Sign in to discover studios, manage bookings, and host your
              creative space.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() =>
                    toast.info("Password reset is not available yet.")
                  }
                  className="text-xs font-semibold text-violet-600 transition hover:text-violet-700"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-transparent px-11 text-sm outline-none transition focus:border-violet-500 dark:border-gray-700 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-violet-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Logging in..." : "Login"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>

            <span className="text-xs font-medium text-gray-400">OR</span>

            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
              aria-label="Google"
            >
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.67 5.95c4.48-4.14 7.1-10.25 7.1-17.6z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.85l-7.67-5.95c-2.13 1.43-4.86 2.28-8.24 2.28-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
            </svg>

            {isGoogleLoading
              ? "Connecting to Google..."
              : "Continue with Google"}
          </button>

          <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-violet-600 transition hover:text-violet-700"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading login...
          </p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
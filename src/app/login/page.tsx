"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        // Handle error
        console.error(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800 dark:shadow-gray-900">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-lg font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
            Login
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center">
          <Link
            href="/api/auth/signin"
            className="mt-2 w-full rounded-lg bg-red-500 px-4 py-2 text-center text-lg font-semibold text-white transition hover:bg-red-600"
          >
            Login with Google
          </Link>
        </div>
      </div>
    </div>
  );
}

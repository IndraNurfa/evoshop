"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 mt-0 flex w-full max-w-full items-center justify-between border-b border-black bg-white p-2 dark:border-b-white dark:bg-black">
      <Link href={"/"}>
        <img src={"vercel.svg"} className="ml-[20px] h-[50px] w-[50px]" />
      </Link>
      <input
        type="text"
        placeholder="search bar"
        className="w-1/2 max-w-xl justify-center rounded-lg border border-black px-3 py-1 text-center text-base dark:border-white"
        disabled
      />
      {/* dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          id="dropdownDefaultButton"
          onClick={() => setOpen((prev) => !prev)}
          className="mr-[20px] inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Menu{" "}
          <svg
            className="ms-3 h-2.5 w-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {open && (
          <div
            id="dropdown"
            className="absolute right-0 z-10 mt-2 mr-[20px] w-full divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  href={"/about"}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={"/faq"}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

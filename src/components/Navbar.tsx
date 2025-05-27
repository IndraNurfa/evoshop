/* eslint-disable @next/next/no-img-element */
"use client";
import {
  faAddressCard,
  faArrowRightFromBracket,
  faCircleQuestion,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

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
    <>
      <nav className="fixed top-0 left-0 z-50 mt-0 flex w-full max-w-full items-center justify-between border-b border-black bg-white p-2 dark:border-b-white dark:bg-black">
        {/* Logo - Left */}
        <div className="flex-none">
          <Link href={"/"}>
            <img
              src="/vercel.svg"
              alt="logo"
              className="ml-[20px] h-[50px] w-[50px]"
            />
          </Link>
        </div>

        {/* Search Bar - Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <input
            type="text"
            placeholder="search bar"
            className="w-[300px] rounded-lg border border-black px-3 py-2 text-center text-base md:w-[350px] lg:w-[380px] 2xl:w-[700px] dark:border-white"
            disabled
          />
        </div>

        {/* Auth Buttons & Menu - Right */}
        <div className="mr-[20px] flex flex-none items-center gap-2">
          {/* Show login/register buttons only on desktop */}
          {!session?.user && (
            <div className="hidden gap-2 lg:flex">
              <Link href="/login">
                <button className="min-h-[40px] rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="min-h-[40px] rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-800">
                  Register
                </button>
              </Link>
            </div>
          )}

          {/* dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="dropdownDefaultButton"
              onClick={() => setOpen((prev) => !prev)}
              className="mr-[20px] inline-flex min-w-[100px] items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {session?.user ? (
                <div>
                  <p className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                    Hello {session.user.name}
                  </p>
                </div>
              ) : (
                "Menu"
              )}
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
                  {/* Show login/register in dropdown only on mobile */}
                  {!session?.user && (
                    <div className="lg:hidden">
                      <li>
                        <Link
                          href="/login"
                          className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <FontAwesomeIcon
                            icon={faRightToBracket}
                            className="mr-2"
                          />
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/register"
                          className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <FontAwesomeIcon
                            icon={faRightToBracket}
                            className="mr-2"
                          />
                          Register
                        </Link>
                      </li>
                    </div>
                  )}

                  <li>
                    <Link
                      href={"/about"}
                      className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/faq"}
                      className="block px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <FontAwesomeIcon
                        icon={faCircleQuestion}
                        className="mr-2"
                      />
                      FAQ
                    </Link>
                  </li>
                  <li>
                    {session?.user && (
                      <button
                        onClick={() => signOut()}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <FontAwesomeIcon
                          icon={faArrowRightFromBracket}
                          className="mr-2"
                        />
                        Sign out
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

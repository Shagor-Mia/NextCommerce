"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { User } from "@prisma/client";
import { logoutUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import HeaderSearchBar from "./HeaderSearchBar";

const AnnouncementBar = () => {
  return (
    <div className="w-full bg-black py-2">
      <div className="container mx-auto flex items-center justify-center px-8">
        <span className="text-center text-sm font-medium tracking-wide text-white">
          FREE shipping free returns
        </span>
      </div>
    </div>
  );
};

type HeaderProps = {
  user: Omit<User, "passwordHash"> | null;
  categorySelector: React.ReactNode;
};
const Header = ({ user, categorySelector }: HeaderProps) => {
  // Start with isOpen as true so the announcement is visible initially
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);

  useEffect(() => {
    // Set initial scroll position
    setPrevScrollY(window.scrollY);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledUp = currentScrollY < prevScrollY;

      if (scrolledUp) {
        setIsOpen(true);
      } else if (currentScrollY > 100) {
        setIsOpen(false);
      }

      // Update the previous scroll position after comparison
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]); // Empty dependency array to avoid the error

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={`w-full transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <AnnouncementBar />
        <div
          className={`w-full flex justify-between items-center py-3 sm:py-4 bg-white/80 shadow-sm border-b border-gray-100 backdrop-blur-sm`}
        >
          <div className="flex justify-between items-center container mx-auto px-8">
            {/* left side */}
            <div className="flex flex-1 justify-start items-center gap-4 sm:gap-6">
              <button className="text-gray-700 hover:text-gray-900 md:hidden">
                <Menu />
              </button>
              <nav className="hidden md:flex gap-4 lg:g-6 text-sm font-medium">
                <Link href={`/`}>Home</Link>
                <Link href={`/about`}>About</Link>
                {categorySelector}
                <Link href={`/contact`}>Contact</Link>
              </nav>
            </div>
            <Link href="#" className="absolute left-1/2 -translate-x-1/2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight">
                DEAL
              </span>
            </Link>
            {/* right side */}
            <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
              <button className="text-gray-700 hover:text-gray-900 hidden sm:block">
                <HeaderSearchBar />
              </button>
              {user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-sm text-gray-700 hidden md:block">
                    {user.email}
                  </span>
                  <Link
                    href="#"
                    className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={async (e) => {
                      e.preventDefault();
                      await logoutUser();
                      router.refresh();
                    }}
                  >
                    Sign Out
                  </Link>
                </div>
              ) : (
                <React.Fragment>
                  <Link
                    href="/auth/sign-in"
                    className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign Up
                  </Link>
                </React.Fragment>
              )}

              <button className="text-gray-700 hover:text-gray-900 relative">
                <HiOutlineShoppingBag />
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";

import { cn } from "@/lib/utils";
import MirretLogo from "@/components/MirretLogo";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav className="fixed top-5 left-0 right-0 z-50 h-[54px]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Left section: Logo + Nav links */}
        <div className="flex items-center gap-10">
          <a href="/">
            <MirretLogo size={24} showText />
          </a>

          {/* Nav links - hidden below md */}
          <div className="hidden items-center gap-8 md:flex">
            <button
              className={cn(
                "flex items-center gap-1.5 text-sm font-normal text-white/[0.87]",
                "transition-opacity duration-200 hover:opacity-70"
              )}
            >
              Platform
              <ChevronDown className="mt-px" />
            </button>
            <button
              className={cn(
                "flex items-center gap-1.5 text-sm font-normal text-white/[0.87]",
                "transition-opacity duration-200 hover:opacity-70"
              )}
            >
              Company
              <ChevronDown className="mt-px" />
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            className={cn(
              "hidden text-sm text-white/[0.87] md:inline-block",
              "transition-opacity duration-200 hover:opacity-70"
            )}
          >
            Client Portal
          </a>
          <a
            href="#"
            className={cn(
              "rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white",
              "transition-all duration-200 hover:bg-white hover:text-[#0f0e0d]"
            )}
          >
            Talk to us
          </a>
        </div>
      </div>
    </nav>
  );
}

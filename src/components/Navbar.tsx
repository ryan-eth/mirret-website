"use client";

import { cn } from "@/lib/utils";

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

function MirretLogo() {
  return (
    <a href="/" className="flex items-center gap-2">
      {/* White shield outline with checkmark */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3L4 7V12C4 16.4 7.4 20.5 12 21.5C16.6 20.5 20 16.4 20 12V7L12 3Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12L11 14L15 10"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-white text-lg font-medium tracking-tight"
      >
        Mirret
      </span>
    </a>
  );
}

export default function Navbar() {
  return (
    <nav className="fixed top-5 left-0 right-0 z-50 h-[54px]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Left section: Logo + Nav links */}
        <div className="flex items-center gap-10">
          <MirretLogo />

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
            Get a Quote
          </a>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import MirretLogo from "@/components/MirretLogo";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Track scroll for background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // check initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  // Focus trap inside mobile menu
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const menu = menuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  // Auto-focus first menu item when opened
  useEffect(() => {
    if (mobileMenuOpen && menuRef.current) {
      const first = menuRef.current.querySelector<HTMLElement>('a[href]');
      first?.focus();
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-[#0f0e0d]/80 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center px-6">
        {/* Left: Logo */}
        <a
          href="/"
          className="transition-opacity duration-200 hover:opacity-80"
        >
          <MirretLogo size={24} showText />
        </a>

        {/* Center: Nav links */}
        <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
          <a
            href="/"
            className="text-sm font-normal text-white/[0.87] transition-colors duration-200 hover:text-white"
          >
            Platform
          </a>
          <a
            href="/company"
            className="text-sm font-normal text-white/[0.87] transition-colors duration-200 hover:text-white"
          >
            Agency
          </a>
        </div>

        {/* Right: CTA + mobile menu */}
        <div className="ml-auto flex items-center gap-4 md:ml-0">
          <a
            href="https://calendly.com/luke-mirret-zn4c/15"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "hidden rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white md:inline-block",
              "transition-all duration-200 hover:bg-white hover:text-[#0f0e0d]"
            )}
          >
            Talk to us
          </a>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors duration-200 hover:bg-white/[0.06] md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 top-16 z-40 bg-[#0f0e0d]/95 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-label="Mobile navigation"
          onKeyDown={handleMenuKeyDown}
        >
          <div className="flex flex-col gap-1 px-6 pt-8">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-normal text-white/[0.87] transition-colors hover:bg-white/[0.06]"
            >
              Platform
            </a>
            <a
              href="/company"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-normal text-white/[0.87] transition-colors hover:bg-white/[0.06]"
            >
              Agency
            </a>

            <div className="mt-6 border-t border-white/[0.08] pt-6">
              <a
                href="https://calendly.com/luke-mirret-zn4c/15"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-full border border-white/30 px-6 py-3 text-center text-base font-medium text-white transition-all duration-200 hover:bg-white hover:text-[#0f0e0d]"
              >
                Talk to us
              </a>
              <a
                href="https://report.mirret.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 block rounded-full bg-white px-6 py-3 text-center text-base font-medium text-[#0f0e0d] transition-opacity duration-200 hover:opacity-90"
              >
                Generate Free Report
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

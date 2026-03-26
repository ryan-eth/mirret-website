import Image from "next/image";

function MirretLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L3 7V12C3 17.25 6.75 22.13 12 23C17.25 22.13 21 17.25 21 12V7L12 2Z"
          fill="white"
        />
        <path
          d="M10 15.17L7.41 12.59L6 14L10 18L18 10L16.59 8.59L10 15.17Z"
          fill="#0f0e0d"
        />
      </svg>
      <span className="text-white text-lg font-medium tracking-tight">
        Mirret
      </span>
    </div>
  );
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="currentColor"
      />
    </svg>
  );
}

const productLinks = ["Surface Monitor", "Threat Reports", "Free Brand Scan", "API Access"];
const companyLinks = ["About", "Contact", "Security"];
const resourceLinks = ["Blog", "Privacy Policy", "Terms of Service"];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08]">
      <div className="mx-auto max-w-[1200px] px-6 py-[60px]">
        {/* Row 1: Main footer content */}
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            <MirretLogo />

            {/* Compliant label */}
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#a3e635]" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-white/[0.45]">
                Compliant
              </span>
            </div>

            {/* Compliance badges */}
            <div className="flex items-center gap-2">
              <Image
                src="/images/compliance-badge-1.png"
                alt="Compliance badge"
                width={40}
                height={40}
                className="rounded-full border border-white/[0.12]"
              />
              <Image
                src="/images/compliance-badge-2.png"
                alt="Compliance badge"
                width={40}
                height={40}
                className="rounded-full border border-white/[0.12]"
              />
              <Image
                src="/images/compliance-badge-3.png"
                alt="Compliance badge"
                width={40}
                height={40}
                className="rounded-full border border-white/[0.12]"
              />
              <span className="ml-1 text-sm text-white/[0.45]">5+</span>
            </div>
          </div>

          {/* Right side: Link columns */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-16">
            {/* Product */}
            <div>
              <h4 className="mb-4 text-[11px] uppercase tracking-[0.15em] text-white/[0.45]">
                Product
              </h4>
              <ul className="flex flex-col">
                {productLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm leading-[2.2] text-white/[0.61] transition-opacity duration-200 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-[11px] uppercase tracking-[0.15em] text-white/[0.45]">
                Company
              </h4>
              <ul className="flex flex-col">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm leading-[2.2] text-white/[0.61] transition-opacity duration-200 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-4 text-[11px] uppercase tracking-[0.15em] text-white/[0.45]">
                Resources
              </h4>
              <ul className="flex flex-col">
                {resourceLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm leading-[2.2] text-white/[0.61] transition-opacity duration-200 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Row 2: Bottom bar */}
        <div className="mt-10 flex items-center justify-between border-t border-white/[0.08] pt-6">
          <p className="text-[13px] text-white/[0.45]">
            &copy; 2026 Mirret Ltd.
          </p>
          <div className="flex items-center gap-3 text-white/[0.45]">
            <a
              href="#"
              className="transition-opacity duration-200 hover:text-white"
              aria-label="X (Twitter)"
            >
              <XIcon />
            </a>
            <span className="text-white/[0.2]">|</span>
            <a
              href="#"
              className="transition-opacity duration-200 hover:text-white"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

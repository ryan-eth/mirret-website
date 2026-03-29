import Image from "next/image";
import MirretLogo from "@/components/MirretLogo";

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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
      aria-hidden="true"
    >
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill="currentColor"
      />
    </svg>
  );
}

const productLinks = [
  { label: "Surface Monitor", href: "/" },
  { label: "Threat Reports", href: "mailto:hello@mirret.co.uk?subject=Threat%20Reports%20Demo" },
  { label: "Free Brand Scan", href: "https://report.mirret.co.uk" },
  { label: "API Access", href: "mailto:hello@mirret.co.uk?subject=API%20Access" },
];

const companyLinks = [
  { label: "About", href: "/company" },
  { label: "Contact", href: "mailto:hello@mirret.co.uk" },
  { label: "Security", href: "mailto:hello@mirret.co.uk?subject=Security%20Inquiry" },
];

const resourceLinks = [
  { label: "Blog", href: "/company" },
  { label: "Privacy Policy", href: "https://mirret.co.uk/privacy" },
  { label: "Terms of Service", href: "https://mirret.co.uk/terms" },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] uppercase tracking-[0.15em] text-white/[0.45]">
        {title}
      </h4>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.href.startsWith("http") || link.href.startsWith("mailto")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-sm leading-[2.2] text-white/[0.61] transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08]">
      <div className="mx-auto max-w-[1200px] px-6 py-[60px]">
        {/* Row 1: Main footer content */}
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            <a href="/">
              <MirretLogo />
            </a>

            {/* Compliant label */}
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#a3e635]" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-white/[0.45]">
                Compliant
              </span>
            </div>

            {/* Compliance badges */}
            <div className="flex items-center gap-2">
              <Image
                src="/images/compliance-badge-1.png"
                alt="SOC 2 compliance badge"
                width={40}
                height={40}
                className="rounded-full border border-white/[0.12]"
              />
              <Image
                src="/images/compliance-badge-2.png"
                alt="ISO 27001 compliance badge"
                width={40}
                height={40}
                className="rounded-full border border-white/[0.12]"
              />
              <Image
                src="/images/compliance-badge-3.png"
                alt="GDPR compliance badge"
                width={40}
                height={40}
                className="rounded-full border border-white/[0.12]"
              />
              <span className="ml-1 text-sm text-white/[0.45]">5+</span>
            </div>
          </div>

          {/* Right side: Link columns */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-16">
            <FooterLinkColumn title="Product" links={productLinks} />
            <FooterLinkColumn title="Company" links={companyLinks} />
            <FooterLinkColumn title="Resources" links={resourceLinks} />
          </div>
        </div>

        {/* Row 2: Bottom bar */}
        <div className="mt-10 flex items-center justify-between border-t border-white/[0.08] pt-6">
          <p className="text-[13px] text-white/[0.45]">
            &copy; {new Date().getFullYear()} Mirret Ltd.
          </p>
          <div className="flex items-center gap-3 text-white/[0.45]">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-white"
              aria-label="Follow Mirret on X"
            >
              <XIcon />
            </a>
            <span className="text-white/[0.2]" aria-hidden="true">|</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-white"
              aria-label="Follow Mirret on LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

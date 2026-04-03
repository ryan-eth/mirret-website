import Image from "next/image";

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#06b6d4" />
      <circle cx="8" cy="8" r="3" fill="#fff" fillOpacity={0.3} />
    </svg>
  );
}

function FileIconDoc() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="24" height="28" rx="4" fill="#2563eb" fillOpacity={0.12} stroke="#3b82f6" strokeOpacity={0.3} strokeWidth="1" />
      <line x1="10" y1="10" x2="22" y2="10" stroke="#60a5fa" strokeOpacity={0.5} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="15" x2="20" y2="15" stroke="#60a5fa" strokeOpacity={0.5} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="20" x2="17" y2="20" stroke="#60a5fa" strokeOpacity={0.5} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function FileIconImage() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="24" height="28" rx="4" fill="#16a34a" fillOpacity={0.12} stroke="#22c55e" strokeOpacity={0.3} strokeWidth="1" />
      <circle cx="12" cy="12" r="2.5" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="1" />
      <path d="M7 22L13 15L17 19L20 16L25 22" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIconSpreadsheet() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="24" height="28" rx="4" fill="#16a34a" fillOpacity={0.12} stroke="#22c55e" strokeOpacity={0.3} strokeWidth="1" />
      <rect x="9" y="9" width="6" height="5" rx="0.5" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="0.8" />
      <rect x="17" y="9" width="6" height="5" rx="0.5" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="0.8" />
      <rect x="9" y="16" width="6" height="5" rx="0.5" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="0.8" />
      <rect x="17" y="16" width="6" height="5" rx="0.5" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="0.8" />
    </svg>
  );
}

function FileIconPdf() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="24" height="28" rx="4" fill="#dc2626" fillOpacity={0.12} stroke="#ef4444" strokeOpacity={0.3} strokeWidth="1" />
      <text x="16" y="19" textAnchor="middle" fill="#f87171" fillOpacity={0.6} fontSize="8" fontWeight="600" fontFamily="sans-serif">PDF</text>
    </svg>
  );
}

function FileIconCode() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="24" height="28" rx="4" fill="#7c3aed" fillOpacity={0.12} stroke="#8b5cf6" strokeOpacity={0.3} strokeWidth="1" />
      <path d="M12 11L8 16L12 21" stroke="#a78bfa" strokeOpacity={0.5} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 11L24 16L20 21" stroke="#a78bfa" strokeOpacity={0.5} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIconGeneric() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="24" height="28" rx="4" fill="#f59e0b" fillOpacity={0.12} stroke="#f59e0b" strokeOpacity={0.3} strokeWidth="1" />
      <circle cx="16" cy="13" r="3" stroke="#fbbf24" strokeOpacity={0.5} strokeWidth="1" />
      <line x1="16" y1="18" x2="16" y2="22" stroke="#fbbf24" strokeOpacity={0.5} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 14V3" stroke="white" strokeOpacity={0.3} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 7L10 3L14 7" stroke="white" strokeOpacity={0.3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13V15C3 16.1 3.9 17 5 17H15C16.1 17 17 16.1 17 15V13" stroke="white" strokeOpacity={0.3} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <span className="h-2 w-2 rounded-full bg-white/[0.08]" />
      <span className="h-2 w-2 rounded-full bg-white/[0.08]" />
      <span className="h-2 w-2 rounded-full bg-white/[0.08]" />
    </div>
  );
}

function CreateAgentMockup() {
  return (
    <div className="mt-8 rounded-xl overflow-hidden border border-white/[0.06]" style={{ background: "#161717" }} aria-hidden="true">
      {/* Window chrome */}
      <WindowDots />

      {/* Content */}
      <div className="px-5 pb-5">
        <p className="text-[15px] font-medium text-white mb-4">New brand scan</p>

        {/* Toggle buttons */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5">
            <ChatIcon />
            <span className="text-[13px] font-medium text-[#191a1a]">Domains</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5">
            <span className="text-[13px] text-white/60">Marketplaces</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5">
            <span className="text-[13px] text-white/60">Social</span>
          </div>
        </div>

        {/* Training documents */}
        <p className="text-[13px] font-medium text-white mb-1">Add brand assets</p>
        <p className="text-[12px] text-white/50 mb-3">Upload logos and guidelines to train threat detection</p>

        {/* File type icons row */}
        <div className="flex gap-2.5 mb-4">
          <FileIconDoc />
          <FileIconImage />
          <FileIconSpreadsheet />
          <FileIconPdf />
          <FileIconCode />
          <FileIconGeneric />
        </div>

        {/* Upload area */}
        <div className="rounded-lg border border-dashed border-white/[0.12] bg-white/[0.02] py-5 flex flex-col items-center justify-center gap-2 mb-5">
          <UploadIcon />
          <span className="text-[12px] text-white/50">Drag files here or click to browse</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end">
          <span className="rounded-lg border border-white/10 px-4 py-1.5 text-[13px] text-white/70">
            Cancel
          </span>
          <span className="rounded-lg bg-white px-4 py-1.5 text-[13px] font-medium text-[#191a1a]">
            Start scan
          </span>
        </div>
      </div>
    </div>
  );
}

function TakedownImage() {
  return (
    <div className="mt-8 rounded-xl overflow-hidden border border-white/[0.06]" aria-hidden="true">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]" style={{ background: "#161717" }}>
        <span className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <span className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <span className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <span className="ml-3 text-[12px] text-white/50">Search results — impersonating your brand</span>
      </div>
      <Image
        src="/images/search-impersonation.png"
        alt="Google search results showing impersonating domains targeting your brand"
        width={700}
        height={500}
        className="w-full"
      />
    </div>
  );
}

export default function AgentBuilderSection() {
  return (
    <section className="w-full px-6 py-12 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Section heading */}
        <h2
          className="text-white font-normal text-[24px] md:text-[44px] md:font-light leading-[1.25] md:leading-[1.15] mb-10 max-w-[550px] font-heading"
        >
          Get full visibility of your attack surface in minutes
        </h2>

        {/* Two cards side by side */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Card 1: Effortless Setup */}
          <div
            className="relative flex-1 rounded-2xl overflow-hidden border border-white/[0.06] mirret-card-gradient"
          >
            {/* Cyan glow at bottom */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-[60%] mirret-card-glow"
            />
            <div className="relative z-10 px-4 pt-6 pb-0 md:px-6 md:pt-8">
              <p className="text-[12px] uppercase tracking-[0.15em] text-white/[0.55] mb-3">
                Threat Scanner
              </p>
              <h3
                className="text-[24px] font-normal text-white mb-3"
              >
                Effortless onboarding
              </h3>
              <p className="text-[15px] leading-relaxed text-white/[0.65] max-w-[400px]">
                Define the brands, domains, and keywords you want to protect. Upload logos, provide seed domains, or share brand guidelines — Mirret does the rest.
              </p>
              <CreateAgentMockup />
            </div>
          </div>

          {/* Card 2: Managed Enforcement */}
          <div
            className="relative flex-1 rounded-2xl overflow-hidden border border-white/[0.06] mirret-card-gradient"
          >
            {/* Cyan glow at bottom */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-[60%] mirret-card-glow"
            />
            <div className="relative z-10 px-4 pt-6 pb-0 md:px-6 md:pt-8">
              <p className="text-[12px] uppercase tracking-[0.15em] text-white/[0.55] mb-3">
                Managed Enforcement
              </p>
              <h3
                className="text-[24px] font-normal text-white mb-3"
              >
                We handle the takedowns
              </h3>
              <p className="text-[15px] leading-relaxed text-white/[0.65] max-w-[400px]">
                Every verified threat enters our enforcement pipeline. We file takedowns with registrars, ad networks, and platforms — and track resolution until it&apos;s gone. You get a report, not a to-do list.
              </p>
              <TakedownImage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="20" height="24" rx="3" fill="#2563eb" fillOpacity={0.15} stroke="#3b82f6" strokeOpacity={0.4} strokeWidth="1" />
      <line x1="9" y1="9" x2="19" y2="9" stroke="#60a5fa" strokeOpacity={0.5} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="9" y1="13" x2="17" y2="13" stroke="#60a5fa" strokeOpacity={0.5} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="9" y1="17" x2="15" y2="17" stroke="#60a5fa" strokeOpacity={0.5} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function FileIconImage() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="20" height="24" rx="3" fill="#16a34a" fillOpacity={0.15} stroke="#22c55e" strokeOpacity={0.4} strokeWidth="1" />
      <circle cx="11" cy="11" r="2" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="1" />
      <path d="M7 20L12 14L16 18L19 15L23 20" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIconSpreadsheet() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="20" height="24" rx="3" fill="#16a34a" fillOpacity={0.15} stroke="#22c55e" strokeOpacity={0.4} strokeWidth="1" />
      <rect x="8" y="8" width="5" height="4" rx="0.5" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="0.8" />
      <rect x="15" y="8" width="5" height="4" rx="0.5" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="0.8" />
      <rect x="8" y="14" width="5" height="4" rx="0.5" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="0.8" />
      <rect x="15" y="14" width="5" height="4" rx="0.5" stroke="#4ade80" strokeOpacity={0.5} strokeWidth="0.8" />
    </svg>
  );
}

function FileIconPdf() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="20" height="24" rx="3" fill="#dc2626" fillOpacity={0.15} stroke="#ef4444" strokeOpacity={0.4} strokeWidth="1" />
      <text x="14" y="17" textAnchor="middle" fill="#f87171" fillOpacity={0.6} fontSize="7" fontWeight="600" fontFamily="sans-serif">PDF</text>
    </svg>
  );
}

function FileIconCode() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="20" height="24" rx="3" fill="#7c3aed" fillOpacity={0.15} stroke="#8b5cf6" strokeOpacity={0.4} strokeWidth="1" />
      <path d="M11 10L8 14L11 18" stroke="#a78bfa" strokeOpacity={0.5} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 10L20 14L17 18" stroke="#a78bfa" strokeOpacity={0.5} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIconGeneric() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="2" width="20" height="24" rx="3" fill="#f59e0b" fillOpacity={0.15} stroke="#f59e0b" strokeOpacity={0.4} strokeWidth="1" />
      <circle cx="14" cy="12" r="3" stroke="#fbbf24" strokeOpacity={0.5} strokeWidth="1" />
      <line x1="14" y1="17" x2="14" y2="20" stroke="#fbbf24" strokeOpacity={0.5} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M14 2L7 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2L9.5 14L7 9L2 6.5L14 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CreateAgentMockup() {
  return (
    <div className="mt-6 rounded-t-xl overflow-hidden" style={{ background: "#191a1a" }} aria-hidden="true">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <h4 className="text-[15px] font-medium text-white mb-4">New brand scan</h4>

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
        <p className="text-[12px] text-white/45 mb-3">Upload logos and guidelines to train threat detection</p>

        {/* File type icons row */}
        <div className="flex gap-2 mb-3">
          <FileIconDoc />
          <FileIconImage />
          <FileIconSpreadsheet />
          <FileIconPdf />
          <FileIconCode />
          <FileIconGeneric />
        </div>

        {/* Upload area */}
        <div className="rounded-lg border border-dashed border-white/15 py-4 flex items-center justify-center mb-5">
          <span className="text-[12px] text-white/40">Drag files here or click to browse</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end">
          <button className="rounded-lg border border-white/10 px-4 py-1.5 text-[13px] text-white/70">
            Cancel
          </button>
          <button className="rounded-lg bg-white px-4 py-1.5 text-[13px] font-medium text-[#191a1a]">
            Start scan
          </button>
        </div>
      </div>
    </div>
  );
}

function SentinelChatMockup() {
  return (
    <div className="mt-6 rounded-t-xl overflow-hidden" style={{ background: "#191a1a" }} aria-hidden="true">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-white">Sentinel</span>
          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[12px] text-white/45">Active</span>
        </div>
        <span className="text-[12px] text-white/45">Threat Log</span>
      </div>

      {/* Chat messages */}
      <div className="px-5 py-4 flex flex-col gap-3">
        {/* Sentinel message 1 */}
        <div className="flex flex-col items-start max-w-[85%]">
          <div className="rounded-xl bg-white/[0.06] px-4 py-2.5">
            <p className="text-[13px] text-white/90 leading-relaxed">
              Hello! I&apos;m Sentinel, your threat analyst. How can I help you today?
            </p>
          </div>
          <span className="text-[11px] text-white/30 mt-1 ml-1">Sentinel &bull; 1 min ago</span>
        </div>

        {/* User message */}
        <div className="flex flex-col items-end self-end max-w-[85%]">
          <div
            className="rounded-xl px-4 py-2.5"
            style={{ background: "linear-gradient(135deg, rgba(6, 182, 212, 0.5) 0%, rgba(6, 140, 180, 0.4) 100%)" }}
          >
            <p className="text-[13px] text-white/90 leading-relaxed">
              Can you add these domains to the watch list:<br />
              <span className="text-[12px] text-white/60 underline">mirret-login.com, mirret-support.net</span>
            </p>
          </div>
          <span className="text-[11px] text-white/30 mt-1 mr-1">Just now</span>
        </div>

        {/* Sentinel message 2 */}
        <div className="flex flex-col items-start max-w-[85%]">
          <div className="rounded-xl bg-white/[0.06] px-4 py-2.5">
            <p className="text-[13px] text-white/90 leading-relaxed">
              Done. I&apos;ve added both domains to active monitoring. Initial scan results will be ready within the hour.
            </p>
          </div>
          <span className="text-[11px] text-white/30 mt-1 ml-1">Sentinel &bull; Just now</span>
        </div>
      </div>

      {/* Input area */}
      <div className="px-5 pb-4">
        <div className="flex items-center rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-2.5">
          <span className="text-[13px] text-white/30 flex-1">Ask Sentinel anything...</span>
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AgentBuilderSection() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Section heading */}
        <h2
          className="text-white font-light text-[28px] md:text-[44px] leading-[1.15] mb-10 max-w-[550px] font-heading"
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
            <div className="relative z-10 px-6 pt-8 pb-0">
              <p className="text-[11px] uppercase tracking-[0.15em] text-white/45 mb-3">
                Threat Scanner
              </p>
              <h3
                className="text-[24px] font-normal text-white mb-3"
              >
                Effortless onboarding
              </h3>
              <p className="text-[14px] leading-relaxed text-white/[0.61] max-w-[400px] mb-0">
                Define the brands, domains, and keywords you want to protect. Upload logos, provide seed domains, or share brand guidelines — Mirret does the rest.
              </p>
              <CreateAgentMockup />
            </div>
          </div>

          {/* Card 2: Easy Updates */}
          <div
            className="relative flex-1 rounded-2xl overflow-hidden border border-white/[0.06] mirret-card-gradient"
          >
            {/* Cyan glow at bottom */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-[60%] mirret-card-glow"
            />
            <div className="relative z-10 px-6 pt-8 pb-0">
              <p className="text-[11px] uppercase tracking-[0.15em] text-white/45 mb-3">
                AI-Native Analysis
              </p>
              <h3
                className="text-[24px] font-normal text-white mb-3"
              >
                Adaptive monitoring
              </h3>
              <p className="text-[14px] leading-relaxed text-white/[0.61] max-w-[400px] mb-0">
                Sentinel learns your brand&apos;s footprint and evolves with it. Ask it to adjust scan scope, investigate anomalies, or explain a detection in plain English.
              </p>
              <SentinelChatMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

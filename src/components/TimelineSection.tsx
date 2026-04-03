const timelineSteps = [
  {
    day: "Day 1",
    title: "Brand intake",
    description:
      "Share your domains, brand assets, and known partners. Sentinel maps your existing digital footprint and identifies your baseline attack surface.",
  },
  {
    day: "Day 3",
    title: "Scan & verify",
    description:
      "Continuous scans begin across certificate logs, DNS records, marketplaces, and social platforms. Sentinel verifies each finding to eliminate false positives.",
  },
  {
    day: "Day 7",
    title: "Full protection",
    description:
      "Receive your first threat report with verified findings. Mirret begins managed enforcement — filing takedown requests and tracking resolution on your behalf.",
  },
];

export default function TimelineSection() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Label + Heading */}
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#06b6d4]" />
          <span
            className="text-[12px] uppercase tracking-[0.15em] text-white/[0.55]"
          >
            How it works
          </span>
        </div>

        <h2
          className="mt-5 mb-8 text-[24px] font-normal text-white md:text-[44px] md:font-light leading-[1.25] md:leading-tight font-heading"
        >
          From zero to full coverage in days
        </h2>

        {/* Gradient Bar */}
        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(to right, #06b6d4, #3b82f6, #6366f1, #8b5cf6)",
          }}
        />

        {/* Three Columns */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {timelineSteps.map((step) => (
            <div key={step.day}>
              <p className="text-sm italic text-[#06b6d4]">{step.day}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-white/[0.65]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Inline CTA — conversion moment after "how it works" */}
        <div className="mt-10 flex flex-col items-center gap-3 md:flex-row md:gap-4">
          <a
            href="https://report.mirret.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-white py-3.5 text-center text-[15px] font-medium text-[#0f0e0d] transition-opacity duration-200 hover:opacity-90 md:w-auto md:px-8"
          >
            Generate Free Report
          </a>
          <a
            href="https://calendly.com/luke-mirret-zn4c/15"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full border border-white/30 py-3.5 text-center text-[15px] font-medium text-white transition-all duration-200 hover:bg-white hover:text-[#0f0e0d] md:w-auto md:px-8"
          >
            Talk to us
          </a>
        </div>
      </div>
    </section>
  );
}

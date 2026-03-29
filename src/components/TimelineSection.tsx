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
    <section className="px-6 py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Label + Heading */}
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#06b6d4]" />
          <span
            className="text-[11px] uppercase tracking-[0.15em] text-white/[0.45]"
          >
            How it works
          </span>
        </div>

        <h2
          className="mt-5 text-[32px] font-light text-white md:text-[44px] font-heading"
        >
          From zero to full coverage in days
        </h2>

        {/* Gradient Bar */}
        <div
          className="mt-12 h-[2px] w-full"
          style={{
            background:
              "linear-gradient(to right, #06b6d4, #3b82f6, #6366f1, #8b5cf6)",
          }}
        />

        {/* Three Columns */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {timelineSteps.map((step) => (
            <div key={step.day}>
              <p className="text-sm italic text-[#06b6d4]">{step.day}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.6] text-white/[0.61]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

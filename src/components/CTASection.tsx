export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-6 py-[100px]">
      {/* CTA Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/[0.45]">
          See your exposure
        </span>

        <h2
          className="mt-6 max-w-[650px] text-[36px] leading-[1.1] font-light text-white md:text-[52px] font-heading"
        >
          Ready to see what&apos;s impersonating your brand right now?
        </h2>

        <p className="mt-5 text-[15px] text-white/[0.61]">
          Generate a free brand exposure report in under 60 seconds.
        </p>

        <a
          href="https://report.mirret.co.uk"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-[15px] font-medium text-[#0f0e0d] transition-opacity duration-200 hover:opacity-90"
        >
          Generate Free Report
        </a>
      </div>

      {/* Giant "Mirret" watermark */}
      <div className="pointer-events-none mt-10 flex items-center justify-center overflow-hidden">
        <span
          className="select-none text-[120px] font-light text-white/[0.03] md:text-[300px] lg:text-[400px] font-heading"
          aria-hidden="true"
        >
          Mirret
        </span>
      </div>
    </section>
  );
}

export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24">
      {/* CTA Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-[12px] uppercase tracking-[0.2em] text-white/[0.55]">
          See your exposure
        </span>

        <h2
          className="mt-6 max-w-[650px] text-[28px] leading-[1.25] font-normal text-white md:text-[52px] md:leading-[1.1] md:font-light font-heading"
        >
          Ready to see what&apos;s impersonating your brand right now?
        </h2>

        <p className="mt-5 text-base text-white/[0.65]">
          Generate a free brand exposure report in under 60 seconds.
        </p>

        <a
          href="https://report.mirret.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block w-full max-w-[340px] rounded-full bg-white py-3.5 text-center text-[15px] font-medium text-[#0f0e0d] transition-opacity duration-200 hover:opacity-90 md:w-auto md:px-8"
        >
          Generate Free Report
        </a>
      </div>

      {/* Giant "Mirret" watermark — smaller on mobile */}
      <div className="pointer-events-none mt-6 flex items-center justify-center overflow-hidden md:mt-10">
        <span
          className="select-none text-[80px] font-light text-white/[0.03] md:text-[300px] lg:text-[400px] font-heading"
          aria-hidden="true"
        >
          Mirret
        </span>
      </div>
    </section>
  );
}

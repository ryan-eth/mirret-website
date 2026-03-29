import { MirretMark } from "@/components/MirretLogo";

export default function NotFound() {
  return (
    <main className="mirret-page-gradient flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <MirretMark size={40} />
      <h1
        className="mt-8 text-[48px] font-light leading-[1.1] text-white md:text-[64px] font-heading"
      >
        404
      </h1>
      <p className="mt-4 max-w-[400px] text-[17px] leading-[1.7] text-white/[0.61]">
        This page doesn&apos;t exist. It might have been moved, or you may have followed a broken link.
      </p>
      <a
        href="/"
        className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-[15px] font-medium text-[#0f0e0d] transition-opacity duration-200 hover:opacity-90"
      >
        Back to home
      </a>
    </main>
  );
}

"use client";

import Image from "next/image";
import { MirretMark } from "@/components/MirretLogo";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function RadarIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 12V2" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12L18.9 18.9" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.6 5.6A9 9 0 1 0 21 12" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.1 8.1A5 5 0 1 0 17 12" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L4 7V12C4 16.4 7.4 20.5 12 21.5C16.6 20.5 20 16.4 20 12V7L12 3Z"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GavelIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 3.5L20.5 9.5L18.5 11.5L12.5 5.5L14.5 3.5Z"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 9.5L14.5 15.5L12.5 17.5L6.5 11.5L8.5 9.5Z"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 20L7 16"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 21H10"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const features = [
  {
    icon: <RadarIcon />,
    title: "Built for detection",
    description: "Continuous scanning across domains, DNS, certificates, and live web",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Built for accuracy",
    description: "AI-verified threats with zero disruption to legitimate partners",
  },
  {
    icon: <GavelIcon />,
    title: "Built for enforcement",
    description:
      "Automated takedown requests across registrars, hosts, and platforms",
  },
];

export default function HeroSection() {
  return (
    <section className="relative pt-[140px]">
      {/* Part 1: Surface Monitor Label */}
      <div className="flex items-center justify-center gap-2">
        <MirretMark size={18} />
        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-sm font-medium text-transparent">
          Surface Monitor
        </span>
      </div>

      {/* Part 2: Main Heading */}
      <h1
        className="mx-auto mt-6 max-w-[800px] text-center text-[36px] leading-[1.1] font-light text-white md:text-[60px]"
        style={{ fontFamily: "var(--font-emilio)" }}
      >
        See every threat to your brand before it reaches your customers
      </h1>

      {/* Part 3: Body Text + Feature Pills Row */}
      <div className="mx-auto mt-12 flex max-w-[1000px] flex-col items-start gap-10 px-6 md:flex-row md:items-start md:justify-between md:gap-6">
        {/* Left side: Body text */}
        <p className="max-w-[320px] text-[15px] leading-[1.7] text-white/[0.61]">
          Mirret continuously scans domains, ads, marketplaces, and social
          platforms to detect impersonation signals before they cause harm.
          Surface Monitor makes it easy to configure, verify, and act on every
          threat across your external attack surface.
        </p>

        {/* Right side: Feature cards */}
        <div className="flex flex-col gap-8 md:flex-row md:gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex max-w-[200px] flex-col gap-2.5">
              <div className="mb-0.5">{feature.icon}</div>
              <h3 className="text-sm font-medium text-white">
                {feature.title}
              </h3>
              <p className="text-[13px] leading-[1.5] text-white/[0.45]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Part 4: Canvas Mockup Image */}
      <div className="relative mx-auto mt-[60px] max-w-[1100px] px-6">
        {/* Video background glow */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-[120%] w-[120%] object-cover opacity-50 saturate-[0.5] hue-rotate-[160deg]"
          >
            <source src={`${basePath}/videos/hero-video.mp4`} type="video/mp4" />
          </video>
        </div>

        {/* Fallback radial gradient glow behind the image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Canvas image */}
        <Image
          src="/images/hero-canvas.png"
          alt="Surface Monitor dashboard showing detected brand threats across domains, marketplaces, and social platforms"
          width={1100}
          height={427}
          className="relative z-10 w-full rounded-xl"
          priority
        />

        {/* Bottom fade overlay */}
        <div className="mirret-hero-fade absolute right-0 bottom-0 left-0 z-20 h-32" />
      </div>
    </section>
  );
}

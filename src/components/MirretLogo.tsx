import { cn } from "@/lib/utils";

interface MirretLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

function MirretMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Mirret logo"
    >
      {/* Left half of M — the original */}
      <path
        d="M 6 54 L 6 12 L 13 8 L 29 40 L 29 54 L 22 54 L 22 42 L 13 22 L 13 54 Z"
        fill="#06b6d4"
      />
      {/* Right half of M — the reflection */}
      <path
        d="M 58 54 L 58 12 L 51 8 L 35 40 L 35 54 L 42 54 L 42 42 L 51 22 L 51 54 Z"
        fill="#06b6d4"
        opacity="0.48"
      />
    </svg>
  );
}

export default function MirretLogo({
  size = 24,
  showText = true,
  className,
}: MirretLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <MirretMark size={size} />
      {showText && (
        <span className="text-lg font-medium tracking-tight text-white">
          Mirret
        </span>
      )}
    </div>
  );
}

export { MirretMark };

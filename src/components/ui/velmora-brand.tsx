import VelmoraLogo from "@/components/ui/velmora-logo";

type VelmoraBrandProps = {
  variant?: "navbar" | "footer";
  lightText?: boolean;
  priority?: boolean;
};

export default function VelmoraBrand({
  variant = "navbar",
  lightText = true,
  priority = false,
}: VelmoraBrandProps) {
  const isNavbar = variant === "navbar";
  const imageSize = isNavbar ? "h-12 w-12 sm:h-14 sm:w-14" : "h-24 w-24";
  const titleSize = isNavbar
    ? "text-lg sm:text-2xl"
    : "text-2xl";
  const titleColor = lightText ? "text-[#F6F1E8]" : "text-[#14213D]";

  return (
    <span className={`flex items-center ${isNavbar ? "gap-2 sm:gap-3" : "gap-4"}`}>
      <VelmoraLogo
        width={isNavbar ? 70 : 110}
        height={isNavbar ? 70 : 110}
        priority={priority}
        sizes={isNavbar ? "(max-width: 639px) 48px, 56px" : "96px"}
        className={`${imageSize} shrink-0`}
      />

      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-[var(--font-playfair)] font-semibold tracking-[0.12em] ${titleSize} ${titleColor}`}
        >
          VELMORA
        </span>

        <span className="mt-1 text-[8px] font-semibold tracking-[0.24em] text-[#C9A227] sm:text-[10px]">
          HOTEL & RESORT
        </span>
      </span>
    </span>
  );
}

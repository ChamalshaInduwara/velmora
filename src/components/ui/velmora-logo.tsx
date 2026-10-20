import Image, { type ImageProps } from "next/image";

type VelmoraLogoProps = Omit<
  ImageProps,
  "alt" | "src"
> & {
  width?: number;
  height?: number;
};

export default function VelmoraLogo({
  width = 96,
  height = 96,
  className,
  ...props
}: VelmoraLogoProps) {
  return (
    <Image
      {...props}
      src="/images/logo/velmora-logo-transparent.png"
      alt="Velmora Hotel & Resort"
      width={width}
      height={height}
      className={`object-contain ${className ?? ""}`}
    />
  );
}

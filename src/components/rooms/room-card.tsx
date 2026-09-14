import Image from "next/image";
import Link from "next/link";
import { BedDouble, Maximize2, Users } from "lucide-react";

type RoomCardProps = {
  slug: string;
  name: string;
  image: string;
  description: string;
  guests: number;
  bed: string;
  size: string;
  price: number;
};

export default function RoomCard({
  slug,
  name,
  image,
  description,
  guests,
  bed,
  size,
  price,
}: RoomCardProps) {
  return (
    <article className="group overflow-hidden bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute bottom-0 right-0 bg-[#14213D] px-5 py-3 text-white">
          <span className="text-xs text-white/70">FROM</span>

          <p className="font-[var(--font-playfair)] text-xl font-semibold text-[#C9A227]">
            LKR {price.toLocaleString()}
          </p>

          <span className="text-xs text-white/70">/ NIGHT</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
          {name}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#242424]/70">
          {description}
        </p>

        {/* Room information */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-y border-[#D8CBB8]/60 py-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <Users size={18} className="text-[#C9A227]" />

            <span className="text-xs text-[#242424]/70">
              {guests} Guests
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <BedDouble size={18} className="text-[#C9A227]" />

            <span className="text-xs text-[#242424]/70">
              {bed}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <Maximize2 size={18} className="text-[#C9A227]" />

            <span className="text-xs text-[#242424]/70">
              {size}
            </span>
          </div>
        </div>

        <Link
          href={`/rooms/${slug}`}
          className="mt-6 flex min-h-12 items-center justify-center border border-[#14213D] text-xs font-semibold tracking-[0.14em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white"
        >
          VIEW DETAILS
        </Link>
      </div>
    </article>
  );
}
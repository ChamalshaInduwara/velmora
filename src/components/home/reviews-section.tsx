import { Quote, Star } from "lucide-react";
import { reviews } from "@/data/reviews";

export default function ReviewsSection() {
  return (
    <section className="bg-[#F6F1E8] px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
            GUEST REVIEWS
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            What Our Guests Say
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-6 text-base leading-8 text-[#242424]/70">
            Discover what guests remember most about their stay at Velmora
            Hotel & Resort.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="relative border border-[#D8CBB8]/70 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote
                size={38}
                strokeWidth={1.3}
                className="absolute right-7 top-7 text-[#C9A227]/30"
              />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    className="fill-[#C9A227] text-[#C9A227]"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-6 text-sm leading-8 text-[#242424]/75">
                “{review.review}”
              </p>

              {/* Guest */}
              <div className="mt-8 border-t border-[#D8CBB8]/70 pt-5">
                <h3 className="font-[var(--font-playfair)] text-lg font-semibold text-[#14213D]">
                  {review.name}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-[#242424]/55">
                  <span>{review.country}</span>
                  <span>•</span>
                  <span>{review.source}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
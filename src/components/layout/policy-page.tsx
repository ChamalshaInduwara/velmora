type PolicySection = {
  title: string;
  paragraphs: string[];
};

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: PolicySection[];
};

export default function PolicyPage({
  eyebrow,
  title,
  description,
  sections,
}: PolicyPageProps) {
  return (
    <main className="bg-[#F6F1E8]">
      <section className="bg-[#14213D] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
            {eyebrow}
          </p>

          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold sm:text-5xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-sm leading-8 text-white/65">
            {description}
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          {sections.map((section) => (
            <article
              key={section.title}
              className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8"
            >
              <h2 className="font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                {section.title}
              </h2>

              <div className="mt-5 space-y-4">
                {section.paragraphs.map(
                  (paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-8 text-[#242424]/70"
                    >
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            </article>
          ))}

          <p className="text-xs leading-6 text-[#242424]/45">
            Last updated: October 2026
          </p>
        </div>
      </section>
    </main>
  );
}
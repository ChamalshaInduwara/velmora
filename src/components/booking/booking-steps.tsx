type BookingStepsProps = {
  currentStep: 1 | 2 | 3 | 4;
};

const steps = [
  {
    number: 1,
    name: "Select Room",
  },
  {
    number: 2,
    name: "Guest Details",
  },
  {
    number: 3,
    name: "Review",
  },
  {
    number: 4,
    name: "Confirmation",
  },
];

export default function BookingSteps({
  currentStep,
}: BookingStepsProps) {
  return (
    <div className="border-b border-[#D8CBB8]/70 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-2">
          {steps.map((step) => {
            const active = step.number <= currentStep;

            return (
              <div
                key={step.number}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                    active
                      ? "bg-[#C9A227] text-[#14213D]"
                      : "bg-[#D8CBB8]/40 text-[#242424]/50"
                  }`}
                >
                  {step.number}
                </div>

                <span
                  className={`mt-2 text-[10px] font-semibold tracking-wide sm:text-xs ${
                    active
                      ? "text-[#14213D]"
                      : "text-[#242424]/40"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
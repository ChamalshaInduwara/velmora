const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function parseBookingDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function calculateNights(
  checkIn: Date,
  checkOut: Date
) {
  return Math.round(
    (checkOut.getTime() - checkIn.getTime()) / DAY_IN_MS
  );
}
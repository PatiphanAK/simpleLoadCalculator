// loadCalculator.ts
export const calculatePMT = (
  principal: number,
  interestRate: number,
  numberOfPeriods: number,
  type: "flat" | "reducing"
): number => {
  const monthlyInterestRate = interestRate / 100 / 12;

  if (type === "flat") {
    // สูตรคำนวณแบบ Flat
    const totalInterest = principal * (interestRate / 100) * (numberOfPeriods / 12);
    return (principal + totalInterest) / numberOfPeriods;
  } else {
    // สูตรคำนวณแบบ Reducing Balance
    const numerator =
      principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPeriods);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPeriods) - 1;
    return numerator / denominator;
  }
};

export const calculateTotalInterest = (
  pmt: number,
  numberOfPeriods: number,
  principal: number
): number => {
  return pmt * numberOfPeriods - principal;
};

export const calculateTotalPayment = (
  pmt: number,
  numberOfPeriods: number
): number => {
  return pmt * numberOfPeriods;
};
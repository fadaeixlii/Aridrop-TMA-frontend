export function formatNumber(number: number, pad: number = 2): string {
  const billion = 1e9;
  const million = 1e6;
  const thousand = 1e3;

  if (number < thousand) {
    return number % 1 === 0
      ? number.toString()
      : number
          .toFixed(pad)
          .replace(/(\.[1-9]*?)0+$/, "$1")
          .replace(/\.$/, "");
  } else if (number < million) {
    return formatSegment(number, thousand, "k", pad);
  } else if (number < billion) {
    return formatSegment(number, million, "M", pad);
  } else {
    return formatSegment(number, billion, "B", pad);
  }
}

function formatSegment(
  number: number,
  divisor: number,
  suffix: string,
  pad: number
): string {
  const formattedNumber = (number / divisor).toFixed(pad);
  return (
    formattedNumber.replace(/(\.[1-9]*?)0+$/, "$1").replace(/\.$/, "") + suffix
  );
}

export function formatCurrency(number: number, pad?: number): string {
  // Use Intl.NumberFormat to format the number as currency
  let formattedCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: pad !== undefined ? pad : 5,
  }).format(number);

  // Remove trailing zeros from the decimal part
  formattedCurrency = formattedCurrency.replace(/(?:\.0*|(\.\d+?)0+)$/, "$1");

  return formattedCurrency.replace("$", "");
}

export const calculate24HChange = (price: number, lastDailyPrice: number) => {
  return ((price - lastDailyPrice) / lastDailyPrice) * 100;
};

export function convertToDecimal(num: number): number {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("Input must be a number");
  }

  // If the number is negative, make it positive temporarily
  const negative: boolean = num < 0;
  if (negative) num = Math.abs(num);

  let result: number = 0.1;
  for (let i = 1; i < num; i++) {
    result *= 0.1;
  }

  // Convert to string and insert decimal point after the first digit
  let strResult: string = result.toFixed(num);
  if (negative) strResult = "-" + strResult;

  // Remove trailing zeros after the decimal point
  strResult = strResult.replace(/\.?0+$/, "");

  return parseFloat(strResult); // Parse the string back to number
}
